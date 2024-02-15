const Request = require("../models/Request.Model")
const Service = require("../models/Service.model")
const User = require("../models/User.model")

// 1 ) crear la request
const create = async (req, res, next) => {
    try {
        const { serviceId } = req.body
        const existService = await Service.findById(serviceId).populate("offerer")
        if (existService.offerer._id.toString() != req.user._id.toString()) {

            const customBody = {
                service: serviceId,
                requestUser: req.user._id
            }
            const newRequest = new Request(customBody)
            await newRequest.save()

            //! ------> actualizamos los otros modelos-----

            // 1)  pendingRequestMyService: request que estan pendiente de mis servicios- me los han pedido a mi
            // 2)  pendingRequestedService: reuqest que me he hecho yo a otras personas

            try {

                // 1) pendingRequestMyService
                await User.findByIdAndUpdate(existService.offerer._id, {
                    $push: { pendingRequestMyService: newRequest._id }
                })

                try {

                    // 2) pendingRequestedService
                    await User.findByIdAndUpdate(req.user._id, {
                        $push: { pendingRequestedService: newRequest._id }
                    })

                    try {

                        await Service.findByIdAndUpdate(serviceId, {
                            $push: { request: newRequest._id }
                        })
                        return res.status(200).json({
                            userOwnerService: await User.findById(existService._id),
                            requestUser: await User.findById(req.user._id),
                            newRequest: newRequest,
                            service: await Service.findById(serviceId)
                        })

                    } catch (error) {

                    }
                } catch (error) {
                    return res.status(404).json({
                        error: "catch error en actualizar el user en la clave pendingRequestedService",
                        message: error.message
                    })
                }
            } catch (error) {
                return res.status(404).json({
                    error: "catch error en actualizar el user en la clave pendingRequestMyService ",
                    message: error.message
                })
            }
        } else {
            return res.status(404).json("no puedes hacerte a ti mismo una request")
        }
    } catch (error) {
        return res.status(404).json({
            error: "catch general create service",
            message: error.message
        })
    }
}

// 2 ) aceptar o no aceptar  la request
const changeStateRequest = async (req, res, next) => {

    try {
        const idAuth = req.user._id
        const { action, idRequest } = req.body

        const existRequest = await Request.findById(idRequest).populate("service requestUser")

        if (existRequest.service.offerer._id.toString() == req.user._id.toString()) {
            switch (action) {
                case "ok":
                    try {
                        await Request.findByIdAndUpdate(idRequest, {
                            state: "accepted",
                            accepted: true
                        })
                        // el servicio le quitamos el id de esta request
                        try {
                            /// el usuario propietario del servicio le quitamos esta request que le han hecho y no se acepto

                            if (!req.user?.acceptedRequest?.includes(idRequest))
                                await User.findByIdAndUpdate(idAuth, {
                                    $pull: { pendingRequestMyService: idRequest },
                                    $push: { acceptedRequest: idRequest }
                                })
                            try {
                                /// el usuario que pidio la request se la quito
                                if (!existRequest.requestUser?.acceptedRequest?.includes(idRequest))
                                    await User.findByIdAndUpdate(existRequest.requestUser, {
                                        $pull: { pendingRequestedService: idRequest },
                                        $push: { acceptedRequest: idRequest }

                                    })
                                return res.status(200).json({
                                    ownerServices: await User.findById(idAuth),
                                    requestUser: await User.findById(existRequest.requestUser),
                                    request: await Request.findById(idRequest)

                                })
                            } catch (error) {
                                return res.status(404).json({
                                    error: "catch error actualizar el user que pidio la request",
                                    message: error, message
                                })
                            }
                        } catch (error) {
                            return res.status(404).json({
                                error: "catch del user que es propietario del servicio al que le hicieron la request",
                                message: error, message
                            })
                        }
                    } catch (error) {
                        return res.status(404).json({
                            error: "catch del update de la request en servicio",
                            message: error, message
                        })
                    }
                case "noOk":

                    try {

                        await Request.findByIdAndDelete(idRequest)

                        try {

                            // el servicio le quitamos el id de esta request

                            await Service.findByIdAndUpdate(existRequest.service._id, {
                                $pull: {
                                    request: idRequest
                                }
                            })
                            try {

                                /// el usuario propietario del servicio le quitamos esta request que le han hecho y no se acepto
                                await User.findByIdAndUpdate(idAuth, {
                                    $pull: { pendingRequestMyService: idRequest }
                                })
                                try {
                                    /// el usuario que pidio la request se la quito
                                    await User.findByIdAndUpdate(existRequest.requestUser, {
                                        $pull: { pendingRequestedService: idRequest }
                                    })

                                    return res.status(200).json({
                                        ownerServices: await User.findById(idAuth),
                                        requestUser: await User.findById(existRequest.requestUser),
                                        deleteRequestOk: await Request.findById(idRequest) ? "no ok delete" : "ok delete"

                                    })


                                } catch (error) {
                                    return res.status(404).json({
                                        error: "catch error actualizar el user que pidio la request",
                                        message: error, message
                                    })

                                }

                            } catch (error) {
                                return res.status(404).json({
                                    error: "catch del user que es propietario del servicio al que le hicieron la request",
                                    message: error, message
                                })

                            }

                        } catch (error) {
                            return res.status(404).json({
                                error: "catch del borrado de la request en servicio",
                                message: error, message
                            })

                        }

                    } catch (error) {
                        return res.status(404).json({
                            error: "catch del borrado de la request",
                            message: error, message
                        })

                    }



                default:
                    break;
            }

        } else {
            return res.status(404).json("tu no eres el que presta el servicio")
        }



    } catch (error) {
        return res.status(404).json({
            error: "",
            message: error, message
        })

    }

}

//!-------
//? GET ALL
//!-------

const getAll = async (req, res, next) => {
    try {
      const allRequest = await Request.find()
  
      if (allRequest.length > 0) {
        return res.status(200).json(allRequest);
      } else {
        return res.status(404).json("Request no found");
      }
    } catch (error) {
      return res.status(404).json({
        error: "error to get request",
        message: error.message,
      });
    }
  };

//!-------
//? GET BY ID
//!-------

  const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const requestById = await Request.findById(id);
      if (requestById) {
        return res.status(200).json(requestById);
      } else {
        return res.status(404).json("request not found");
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };



// 3) Delete de la request



module.exports = { create, changeStateRequest, getAll, getById }