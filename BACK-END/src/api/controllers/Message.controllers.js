const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");
const Menssage = require("../models/Message.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

//*--------CRUD--------*/

//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createMessage = async (req, res, next) => {
  try {
    const { owner, type, content } = req.body;
    const { idRecipient } = req.params; //* -----> id de a quien quiero hacer el comentario

    const findUser = await User.findById(idRecipient); //*-----> si no se encuentra nada nos devolverá null
    //todo: idRecipient cambiarlo según el modelo de user
    //** cuando el findById NO ENCUENTRA EL ELEMENTOS  devuelve un null */
    if (findUser) {
      //*-----> creamos el comentario y lo guardamos
      const newMessage = new Menssage(req.body);
      const savedMessage = await newMessage.save();
      if (type == "private") {
        //? MENSAJES PRIVADOS
        //! TENEMOS QUE EVALUAR SI TENEMOS UN CHAT ABIERTO CON ESTOS DOS USER
        try {
          //*-----> despues de guardarlo comprobamos exista un chat o no

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

          //*------------- ACTUALIZAR CHAT------------------

          if (chatExistOne != null || chatExistTwo != null) {
            //*----> si existe un chat y entonces lo actualizamos conm el nuevo mensaje

            if (chatExistOne) {
              try {
                await chatExistOne.updateOne({
                  $push: { messages: newMessage._id },
                });

                try {
                  await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                      postedMessages: newMessage._id,
                    },
                  });
                  return res.status(200).json({
                    chat: await Chat.findById(chatExistOne._id),
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user en la clave postedMenssages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                try {
                  await Menssage.findByIdAndDelete(savedMessage._id);
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
            } else if (chatExistTwo) {
              try {
                await chatExistTwo.updateOne({
                  $push: { messages: newMessage._id },
                });

                try {
                  await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                      postedMessages: newMessage._id,
                    },
                  });
                  return res.status(200).json({
                    chat: await Chat.findById(chatExistTwo._id),
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user en la clave postedMenssages",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                try {
                  await Menssage.findByIdAndDelete(savedMessage._id);
                  return res
                    .status(404)
                    .json(
                      "error en actualizar el chat existente, elimino el comentario"
                    );
                } catch (error) {
                  return res
                    .status(404)
                    .json(
                      "no he borrado el coment ni tampoco he actualizdo el chat existente"
                    );
                }
              }
            }
          } else {
            console.log("entro");

            //*------------- CREAR CHAT PORQUE NO EXISTE NINGUNO------------------

            const newChat = new Chat({
              //*---> crear un chat con el comentario que hemos creado
              userOne: req.user._id,
              userTwo: findUser._id,
              messages: [savedMessage._id],
            });

            try {
              await newChat.save();

              try {
                await User.findByIdAndUpdate(req.user._id, {
                  $push: {
                    postedMessages: newMessage._id,
                    chats: newChat._id,
                  },
                });

                try {
                  await User.findByIdAndUpdate(idRecipient, {
                    $push: {
                      chats: newChat._id,
                    },
                  });

                  return res.status(200).json({
                    chat: newChat,
                    comment: newMessage,
                  });
                } catch (error) {
                  return res.status(404).json({
                    error:
                      "no hemos actualizado el user que recibe el comentario la clave chat",
                    idMessage: newMessage._id,
                  });
                }
              } catch (error) {
                return res.status(404).json({
                  error:
                    "no hemos actualizado el user en la clave postedMenssages y tampoco en la clave chats",
                  idMessage: newMessage._id,
                });
              }
            } catch (error) {
              //*-----> lo borramos porque no nos ha enviado bien el tipo
              try {
                await Menssage.findByIdAndDelete(savedMessage._id);
                return res.status(404).json(error.message);
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
        // --------------------------------mensaje publico se convierte en review --------------------------

        const newReview = new Review({
          owner: req.user._id,
          recipient: req.body.recipientUser,
          reviews: savedMessage._id,
        });

        try {
          await newReview.save();

          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: {
                reviewedByYou: newReview._id,
              },
            });
            try {
              await User.findByIdAndUpdate(idRecipient, {
                $push: {
                  reviewedByOthers: newReview._id,
                },
              });

              return res.status(200).json({
                userReviewer: await User.findById(req.user._id),
                userReviewed: await User.findById(idRecipient),
                review: newReview._id,
              });
            } catch (error) {
              return res.status(404).json({
                error: "Catch error updating reviewed by others",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error: "Catch error updating reviewed by you",
              message: error.message,
            });
          }
        } catch (error) {
          try {
            await Menssage.findByIdAndDelete(savedMessage._id);
            return res.status(404).json(error.message);
          } catch (error) {
            return res.status(404).json({
              error: "Catch error creating Review. Message not deleted",
              message: error.message,
            });
          }
        }
      } else {
        await Message.findByIdAndDelete(savedMessage._id);
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    return res.status(404).json({ error: "zopenca", message: error.message });
  }
};

//! --------------------------------- GET BY ID ---------------------------------

const getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messageById = await Message.findById(id);
    if (messageById) {
      return res.status(200).json(messageById);
    } else {
      return res.status(404).json("Message not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! --------------------------------- GET AL ---------------------------------

const getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find();
    if (allMessages.length > 0) {
      return res.status(200).json(allMessages);
    } else {
      return res.status(404).json("Messages not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding all messages",
      message: error.message,
    });
  }
};

module.exports = { createMessage, getMessageById, getAllMessages };
