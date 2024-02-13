const User = require("../models/User.model");
const Chat = require("../models/Chat.model");
const Service = require("../models/Service.model");
const Contract = require("../models/Contract.model");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++-------C R U D--------+++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createContract = async (req, res, next) => {
  try {
    const { 
        userOne, 
        userTwo, 
        serviceOne, 
        serviceTwo,
        dueDate,  
        acceptedByUserOne, 
        acceptedByUserTwo, 
        rejectedByUserOne,
        rejectedByUserTwo,
        status, 
        finalizedByUserOne, 
        finalizedByUserTwo
    } = req.body;

    // Creamos un nuevo contrato con un POST
    const newContract = new Contract(req.body);

    //! popoular fecha de vencimiento ?
    //! definir UserOne y UserTwo a partir de como sea que los han llamado en el controlador de solicitud.

    const savedContract = await newContract.save();
    
      if (acceptedByUserOne == true && acceptedByUserTwo == true ) {
        // en el caso de que tanto el 
        try {

            $push: {pendingContracts: newContract._id },
          /// despues de guardarlo comprobamos exista un chat o no

          const chatExistOne = await Chat.findOne({
            userOne: req.user._id,
            userTwo: findUser._id,
          });
          const chatExistTwo = await Chat.findOne({
            userOne: findUser._id,
            userTwo: req.user._id,
          });
          console.log(chatExistOne);
          console.log(chatExistTwo);

          if (chatExistOne != null || chatExistTwo != null) {
            ///&/ existe un chat y entonces lo actualizamos conm el nuevo mensaje

            if (chatExistOne) {
              try {
                await chatExistOne.updateOne({
                  $push: { messages: newMessage._id },
                });

                return res.status(200).json({
                  chat: await Chat.findById(chatExistOne._id),
                  comment: newMessage,
                });
              } catch (error) {
                try {
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el comment ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            } else if (chatExistTwo) {
              try {
                await chatExistTwo.updateOne({
                  $push: { messages: newMessage._id },
                });

                return res.status(200).json({
                  chat: await Chat.findById(chatExistTwo._id),
                  comment: newMessage,
                });
              } catch (error) {
                try {
                  await Message.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el coment  ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            }
          } else {
            console.log("entro");

            /// crear un chat con el comentario que hemos creado
            const newChat = new Chat({
              userOne: req.user._id,
              userTwo: findUser._id,
              messages: [savedMessage._id],
            });

            try {
              await newChat.save();
              return res.status(200).json({
                chat: newChat,
                comment: newMessage,
              });
            } catch (error) {
              // lo borramos porque no nos ha enviado bien el tipo
              try {
                await Message.findByIdAndDelete(savedMessage._id);
                return res
                  .status(404)
                  .json(
                    "no se ha guardado el nuevo chat y se ha borrado el comentario"
                  );
              } catch (error) {
                return res
                  .status(404)
                  .json(
                    "no se ha creado el chat pero no se ha borrado el comentario"
                  );
              }
            }
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else if (type == "public") {
        // SIMPLEMENTE CREAMOS EL COMENTARIO Y LO METEMOS EN LOS ARRAY DE LOS MODELOS AL QUE CORRESPONDA -- USER
      } else {
        // lo borramos porque no nos ha enviado bien el tipo
        await Message.findByIdAndDelete(savedMessage._id);
        return res.status(404).json(error.message);
      }
    
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createContract };