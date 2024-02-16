const User = require("../models/User.model");
const Chat = require("../models/Chat.model");
const Service = require("../models/Service.model");
const Contract = require("../models/Contract.model");
const Request = require("../models/Request.Model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createContract = async (req, res, next) => {
  try {

    await Contract.syncIndexes()

    const existRequest = await Request.findById(req.body.request).populate("service")
    if (existRequest) {
      if (req.user._id.toString() == existRequest.service.offerer.toString()) {
        const customBody = {
          userOne: req.user._id, // el uno siempre es el recepto de la request
          serviceOne: existRequest.service._id,
          userTwo: existRequest.requestUser,
          serviceTwo: req.body.serviceTwo,
          dueDate: req.body.dueDate,
          specialCondicion: req.body.specialCondicion
        }
        try {
          const newContract = new Contract(customBody)
          await newContract.save()
          const existContract = await Contract.findById(newContract._id)

          try {

            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                pendingContract: newContract._id
              }
            })

            try {

              await User.findByIdAndUpdate(existRequest.requestUser, {
                $push: {
                  pendingContract: newContract._id
                }
              })

              try {

                await Request.findByIdAndUpdate(req.body.request, { //*----> cambio de estado de la request
                  //! ---- es contrato o klk? 
                  accepted: true,
                  state: "accepted"
                })

                return res.status(existContract ? 200 : 400).json(existContract ? newContract : "error en el save")
              } catch (error) {
                return res.status(404).json({
                  error: "no ha cambiado el state de la request",
                  message: error.message
                })
              }



            } catch (error) {
              return res.status(404).json({
                error: "error update user que crea la request del servicio en la clave pendingContract",
                message: error.message
              })
            }
          } catch (error) {
            return res.status(404).json({
              error: "error update user propietario del servicio en la clave pendingContract",
              message: error.message
            })

          }
        } catch (error) {
          return res.status(404).json({
            error: "error save contract",
            message: error.message
          })
        }
      } else {
        return res.status(404).json("no eres el que presta el servicio al que se le hace la request de origen")
      }
    } else {
      return res.status(404).json("no existe esta request")
    }
  } catch (error) {
    return res.status(404).json({
      error: "error general create contract",
      message: error.message
    })
  }
};


//! ---------------------------------------------------------------------
//? ----------------------UPDATE PARA ACEPTAR----------------------------
//! ---------------------------------------------------------------------

const updateAccept = async (req, res, next) => {
  try {
    const { contract } = req.params
    const existContract = await Contract.findById(contract)

    if (existContract) {
      if (existContract.state == "rechazado" || existContract.state == "caducado" || existContract.state == "finalizado") {
        return res.status(404).json("no puede aceptarlo porque alguien lo ha rechazado, o esta caducado o ya esta finalizado")
      } else {
        let accept = ""
        ///acceptedByUserOne lo mandamos en true o false
        if (req.body.acceptedByUserOne && existContract.userOne.toString() == req.user._id.toString()) {
          accept = `acceptedByUserOne`
        } else if (req.body.acceptedByUserTwo && existContract.userTwo.toString() == req.user._id.toString()) {
          accept = `acceptedByUserTwo`
        }
        console.log("accept", accept)
        try {
          accept != "" && await Contract.findByIdAndUpdate(contract, { //*----> si acc no está vacío entonces accept es true
            [accept]: true,
          })
          const updateContrat = await Contract.findById(contract)
          if (accept == "") {
            res.status(404).json("ninguno ha aceptado una mierda")
          } else {
            const updateContrat = await Contract.findById(contract)
            if (updateContrat.acceptedByUserOne && updateContrat.acceptedByUserTwo) {
              try {
                await User.updateMany({ pendingContract: contract }, {
                  $pull: {
                    pendingContract: contract
                  },
                  $push: {
                    acceptedContract: contract
                  }
                })
                try {
                  await Contract.findByIdAndUpdate(contract, {
                    state: "en curso",
                  })
                  return res.status(200).json({
                    contract: await Contract.findById(contract)
                  })
                } catch (error) {
                  return res.status(404).json({
                    error: `error update state`,
                    message: error.message
                  })
                }
              } catch (error) {
                return res.status(404).json({
                  error: `error update User pendingContract acceptedContract`,
                  message: error.message
                })
              }
            } else {
              res.status(404).json({
                contract: await Contract.findById(contract),
                message: "falta uno por aceptar"
              })
            }
          }
        } catch (error) {
          return res.status(404).json({
            error: `error update contract clave ${accept}`,
            message: error.message
          })
        }

      }

    } else {
      return res.status(404).json("este contrato no existe")
    }


  } catch (error) {
    return res.status(404).json({
      error: "error general updateAccept contract",
      message: error.message
    })
  }

};



//! ---------------------------------------------------------------------
//? -----------------------UPDATE PARA RECHAZAR--------------------------
//! ---------------------------------------------------------------------

const updateRechazar = async (req, res, next) => {
  try {
    const { contract } = req.params
    const existContract = await Contract.findById(contract)

    if (existContract) {
      if (existContract.state == "en curso" || existContract.state == "caducado" || existContract.state == "finalizado") {
        return res.status(404).json("no puede rechazar porque ya esta en curso, o esta caducado o ya esta finalizado")
      } else {

        let accept = ""
        ///rejectedByUserOne lo mandamos en true o false
        if (req.body.rejectedByUserOne && existContract.userOne.toString() == req.user._id.toString()) {
          accept = `rejectedByUserOne`
        } else if (req.body.rejectedByUserTwo && existContract.userTwo.toString() == req.user._id.toString()) {
          accept = `rejectedByUserTwo`
        }
        console.log("accept", accept)
        try {
          accept != "" && await Contract.findByIdAndUpdate(contract, {
            [accept]: true,
            state: "rechazado"
          })

          if (accept == "") {
            res.status(404).json("no eres parte del contrato")
          } else {
            const updateContrat = await Contract.findById(contract)

            try {

              await User.updateMany({ pendingContract: contract }, {
                $pull: { pendingContract: contract },
                $push: { rejectedContract: contract }
              })

              return res.status(200).json({
                contract: await Contract.findById(contract).populate("userOne userTwo")
              })

            } catch (error) {
              return res.status(404).json({
                error: `error updateMany pendingContract rejectedContract`,
                message: error.message
              })


            }

          }
        } catch (error) {
          return res.status(404).json({
            error: `error update contract clave ${accept}`,
            message: error.message
          })
        }


      }

    } else {
      return res.status(404).json("este contrato no existe")
    }


  } catch (error) {
    return res.status(404).json({
      error: "error general updateAccept contract",
      message: error.message
    })
  }

};

//! ---------------------------------------------------------------------
//? -----------------------------UPDATE PARA FINALIZAR SERVICIO --------------------------
//! ---------------------------------------------------------------------




//! ---------------------------------------------------------------------
//? --------------------------- COMPROBAR CONTRATOS CADUCADOS--------------------------
//! ---------------------------------------------------------------------




//! ---------------------------------------------------------------------
//? --------------------------- CAMBIAR EL ESTADO--------------------------
//! ---------------------------------------------------------------------



module.exports = { createContract, updateAccept, updateRechazar };