//! --------------------------middleware------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! ---------------------------- modelos -----------------------------------
const User = require("../models/User.model");
const Reviews = require("../models/Review.model");
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model");
const Rating = require("../models/Rating.model");
const Service = require("../models/Service.model");

//! ---------------------------- utils -------------------------------------
const randomCode = require("../../utils/randomCode");

//! ------------------------------librerias---------------------------------
const enumOk = require("../../utils/enumOk");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {
  setTestEmailSend,
  getTestEmailSend,
} = require("../../state/state.data");
const setError = require("../../helpers/handle-error");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");
const Communities = require("../models/Communities.model");
const Request = require("../models/Request.Model");

dotenv.config();

//!------------------
//? REGISTER REDIRECT
//!------------------

const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        const PORT = process.env.PORT;
        if (userSave) {
          return res.redirect(
            307,
            `http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) {
      deleteImgCloudinary(catchImg);
    }
    return next(error);
  }
};

//!----------
//? SEND CODE
//!----------

const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
      tls: {
        // AÑADIR ESTA PARTE PARA QUE FUCNCIONES
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Confirmation code",
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          error: error.message,
          user: userDB,
          confirmationCode: "error, resend code",
        });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        user: userDB,
        confirmationCode: userDB.confirmationCode,
      });
    });
  } catch (error) {
    return next(error);
  }
};

//!------------
//? RESEND CODE
//!------------

const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `tu codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({
            resend: false,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//!---------------
//? CHECK NEW USER
//!---------------
const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json("User not found");
    } else {
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ check: true });
          const updateUser = await User.findOne({ email });
          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        try {
          await User.findByIdAndDelete(userExists._id);
          deleteImgCloudinary(userExists.image);
          return res.status(200).json({
            userExists,
            check: false,
            delete: (await User.findById(userExists._id))
              ? "error delete user"
              : "ok delete user",
          });
        } catch (error) {
          return res
            .status(404)
            .json(error.message || "error general delete user");
        }
      }
    }
  } catch (error) {
    return next(setError(500, error.message || "General error check code"));
  }
};

//!------
//? LOGIN
//!------

const login = async (req, res, next) => {
  console.log("entro", req.body);
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!----------
//? AUTOLOGIN
//!----------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (password == userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//!-------------------------------
//? PASSWORD CHANGE: NOT LOGGED IN
//!-------------------------------

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const userDb = await User.findOne({ email });
    if (userDb) {
      const PORT = process.env.PORT;
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json("dont send email and dont update user");
      } else {
        console.log("Email sent: " + info.response);
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          //!------------------ test --------------------------------------------
          const userUpdatePassword = await User.findById(id);
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//!---------------------------
//? PASSWORD CHANGE: LOGGED IN
//!---------------------------

const modifyPassword = async (req, res, next) => {
  console.log("req.user", req.user);

  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;

    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
        const userUpdate = await User.findById(_id);
        if (bcrypt.compareSync(newPassword, userUpdate.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json("password dont match");
    }
  } catch (error) {
    return next(error);
  }
};

//!-------
//? UPDATE
//!-------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();

    const patchUser = new User(req.body);

    req.file && (patchUser.image = catchImg);

    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;

    if (req.body?.gender) {
      const resultEnum = enumOk(req.body?.gender);
      patchUser.gender = resultEnum.check ? req.body?.gender : req.user.gender;
    }

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);

      if (req.file) deleteImgCloudinary(req.user.image);

      const updateUser = await User.findById(req.user._id);

      const updateKeys = Object.keys(req.body);

      const testUpdate = [];

      updateKeys.forEach((item) => {
        if (updateUser[item] === req.body[item]) {
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({
              [item]: true,
            });
          } else {
            testUpdate.push({
              [item]: "sameOldInfo",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      /// ---------------------- para la imagen ---------------------------------
      if (req.file) {
        updateUser.image === catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }
      return res.status(200).json({
        updateUser,
        testUpdate,
      });
    } catch (error) {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!-------
//? CHANGE ROL
//!-------

const changeRol = async (req, res, next) => {
  try {
    // Buscamos el usuario por su ID y actualizamos su rol
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { rol: "admin" },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

//!-------
//? DELETE
//!-------

const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    const userDb = await User.findById(_id);
    await User.findByIdAndDelete(_id);
    if (await User.findById(_id)) {
      return res.status(404).json("not deleted");
    } else {
      try {
        await User.updateMany({ followed: _id }, { $pull: { followed: _id } });
        await User.updateMany(
          { followers: _id },
          { $pull: { followers: _id } }
        );
        await User.updateMany({ banned: _id }, { $pull: { banned: _id } });
        await User.updateMany({ bannedBy: _id }, { $pull: { bannedBy: _id } });
        try {
          await Message.deleteMany({ owner: _id });
          for (const message of userDb.reviewedByYou) {
            await User.updateMany(
              { reviewedByOthers: message },
              { $pull: { reviewedByOthers: message } }
            );
          }
          try {
            for (const chat of userDb.chats) {
              await Chat.findByIdAndDelete(chat);
              await User.updateOne({ chats: chat }, { $pull: { chats: chat } });
            }
            try {
              for (const rating of userDb.ratedByYou) {
                await Rating.findByIdAndDelete(rating);
                await User.updateOne(
                  { ratedByOthers: rating },
                  { $pull: { ratedByOthers: rating } }
                );
              }
              try {
                await Service.deleteMany({ offerer: _id });
                try {
                  await Communities.updateMany(
                    { users: _id },
                    { $pull: { users: _id } }
                  );
                  try {
                    for (const request of userDb.pendingRequestMyService) {
                      await Request.findByIdAndDelete(request);
                      await User.updateOne(
                        { pendingRequestedService: request },
                        { $pull: { pendingRequestedService: request } }
                      );
                    }
                    for (const request of userDb.pendingRequestedService) {
                      await Request.findByIdAndDelete(request);
                      await User.updateOne(
                        { pendingRequestMyService: request },
                        { $pull: { pendingRequestMyService: request } }
                      );
                    }
                    return res.status(200).json("Borrado correcto");
                  } catch (error) {
                    return res.status(404).json("error borrando las request");
                  }
                } catch (error) {
                  return res
                    .status(404)
                    .json("error actualizando las comunidades");
                }
              } catch (error) {
                return res.status(404).json("error borrando los servicios");
              }
            } catch (error) {
              return res.status(404).json("error borrando ratings");
            }
          } catch (error) {
            return res.status(404).json("error borrando chats");
          }
        } catch (error) {
          return res.status(404).json("error actualizando mensajes");
        }
      } catch (error) {
        return res.status(404).json("error actualizando usuario");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//!-------
//? GET ALL
//!-------

const getAll = async (req, res, next) => {
  try {
    const allUser = await User.find();

    if (allUser.length > 0) {
      return res.status(200).json(allUser);
    } else {
      return res.status(404).json("Users no found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error to get users",
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
    const usersById = await User.findById(id);
    if (usersById) {
      return res.status(200).json(usersById);
    } else {
      return res.status(404).json("user not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

/* const baneo = async (req, res, next) =>{
};
const blockApp = async (req, res, next) =>{
};*/

//! ------------
//?  FOLLOW USER
//! ------------

const followUserToggle = async (req, res, next) => {
  try {
    const { idUserToFollow } = req.params;
    console.log(`🧐`, idUserToFollow);
    const { followed } = req.user; // busco en el arrray de seguidores si le sigo o no este usuario

    if (followed.includes(idUserToFollow)) {
      //! si lo incluye, quiere decir lo sigo por lo que lo dejo de seguir
      try {
        // 1) como lo quiero dejar de seguir quito su id del array de los que me siguen

        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            followed: idUserToFollow,
          },
        });
        try {
          // 2) del user que dejo de seguir me tengo que quitar de sus seguidores

          await User.findByIdAndUpdate(idUserToFollow, {
            $pull: {
              followers: req.user._id,
            },
          });

          return res.status(200).json({
            action: "no longer following",
            authUser: await User.findById(req.user._id),
            userSeQuiereSeguir: await User.findById(idUserToFollow),
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update param user followers",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update deleting from user followers",
          message: error.message,
        });
      }
    } else {
      //! si no lo tengo como que lo sigo, lo empiezo a seguir

      try {
        // 1) como lo quiero dejar de seguir quito su id del array de los que me siguen

        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            followed: idUserToFollow,
          },
        });
        try {
          // 2) del user que dejo de seguir me tengo que quitar de sus seguidores

          await User.findByIdAndUpdate(idUserToFollow, {
            $push: {
              followers: req.user._id,
            },
          });

          return res.status(200).json({
            action: "Started to follow",
            authUser: await User.findById(req.user._id),
            userSeQuiereSeguir: await User.findById(idUserToFollow),
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update param user followers",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update adding param id to followers",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: "error catch general",
      message: error.message,
    });
  }
};

//!--------------
//? TOGGLE BANNED
//!--------------

const bannedToggle = async (req, res, next) => {
  try {
    const { idUserToBan } = req.params;
    const { banned } = req.user; // busco en el arrray de seguidores si le sigo o no este usuario

    if (banned.includes(idUserToBan)) {
      //! si lo incluye, quiere decir lo sigo por lo que lo dejo de seguir
      try {
        // 1) como lo quiero dejar de seguir quito su id del array de los que me siguen

        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            banned: idUserToBan,
          },
        });
        try {
          // 2) del user que dejo de seguir me tengo que quitar de sus seguidores

          await User.findByIdAndUpdate(idUserToBan, {
            $pull: {
              bannedBy: req.user._id,
            },
          });

          return res.status(200).json({
            action: "No longer banned",
            authUser: await User.findById(req.user._id),
            userToBan: await User.findById(idUserToBan),
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update param user bannedBy field",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update deleting param user from banned field",
          message: error.message,
        });
      }
    } else {
      //! si no lo tengo como que lo sigo, lo empiezo a seguir

      try {
        // 1) como lo quiero dejar de seguir quito su id del array de los que me siguen

        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            banned: idUserToBan,
          },
        });
        try {
          // 2) del user que dejo de seguir me tengo que quitar de sus seguidores

          await User.findByIdAndUpdate(idUserToBan, {
            $push: {
              bannedBy: req.user._id,
            },
          });

          return res.status(200).json({
            action: "I have banned him",
            authUser: await User.findById(req.user._id),
            userToBan: await User.findById(idUserToBan),
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update para user bannedBy field",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update adding para ID to banned",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: "error catch general",
      message: error.message,
    });
  }
};

module.exports = {
  register,
  resendCode,
  sendCode,
  login,
  autoLogin,
  checkNewUser,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  changeRol,
  getAll,
  followUserToggle,
  getById,
  bannedToggle,
};
