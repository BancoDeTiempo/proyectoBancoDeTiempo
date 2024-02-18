//! --------------------------middleware------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! ---------------------------- modelos -----------------------------------
const User = require("../models/User.moel");

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
            303,
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
    await User.findByIdAndDelete(req.user?._id);
    deleteImgCloudinary(dataBaseUser.image);
    try {
      try {
        await Message.deleteMany({ owner: _id });
        try {
          await User.updateMany(
            { followed: _id },
            { $pull: { followers: _id } }
          );
          try {
            await Reviews.updateMany(
              { reviewedByYou: _id },
              { $pull: { owner: _id } }
            );
            try {
              await Room.deleteMAny({ postedBy: _id });
              try {
                await Post.deleteMany({ author: _id });
                try {
                  await Post.updateMany(
                    { likes: _id },
                    { $pull: { likes: _id } }
                  );
                  try {
                  } catch (error) {
                    return res.status(404).json("Error pulling messages");
                  }
                } catch (error) {
                  return res.status(404).json("Error updating followed.");
                }
              } catch (error) {
                return res.status(404).json("Error deleting review");
              }
            } catch (error) {
              return res.status(404).json("Error deleting room announcements.");
            }
          } catch (error) {
            return res.status(404).json("Error pulling rooms likes.");
          }
        } catch (error) {
          return res.status(404).json("Error pulling comments likes.");
        }
      } catch (error) {
        return res.status(404).json("Error deleting comments.");
      }
    } catch (error) {
      return res.status(404).json("Error updating references to other models.");
    }
    const doesUserExist = await User.findById(req.user._id);
    console.log(doesUserExist);
    return res
      .status(doesUserExist ? 404 : 200)
      .json(
        doesUserExist
          ? "User not deleted. Please try again."
          : "User deleted successfully."
      );
  } catch (error) {
    return res.status(500).json("Error in delete catch");
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
    const { idFollowedUser } = req.params;
    const { followed } = req.user; // busco en el arrray de seguidores si le sigo o no este usuario

    if (followed.includes(idFollowedUser)) {
      // si ya lo incluye, entonces se deja de seguir (unfollow)
      try {
        // 1) al dejarlo de seguir se saca su id del array de los seguidores del usuario logado

        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            followed: idFollowedUser,
          },
        });
        try {
          // 2) y también se saca el id del usuario logado del array de sus followers

          await User.findByIdAndUpdate(idFollowedUser, {
            $pull: {
              followers: req.user._id,
            },
          });

          return res.status(200).json({
            action: "he dejado de seguirlo",
            authUser: await User.findById(req.user._id),
            idFollowedUser: await User.findById(idFollowedUser),
          });

        } catch (error) {
          return res.status(404).json({
            error:
              "error catch update el follow del user recibido por param",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error:
            "error catch update borrar de followers el id recibido por param",
          message: error.message,
        });
      }
    } else {
      //! si no lo tengo como siguiendo, pasa a ser un followed

      try {
        // 1) Se añade el id del usuario al que se quiere seguir a la lista de followed del usuario logado

        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            followed: idFollowedUser,
          },
        });
        try {
          // 2) Se añade el id del usuario logado a la lista de followers del usuario al que se solicita seguir

          await User.findByIdAndUpdate(idFollowedUser, {
            $push: {
              followers: req.user._id,
            },
          });

          return res.status(200).json({
            action: "Comienzo a seguirlo",
            authUser: await User.findById(req.user._id),
            userFollowed: await User.findById(idFollowedUser),
          });

        } catch (error) {
          return res.status(404).json({
            error:
              "error catch update lista de followers del user recibido por param",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error:
            "error catch update lista de followed con el id del user recibido por param",
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



//!---------------------
//? TOGGLE BLOCKED USERS
//!---------------------

const blockedUserToggle = async (req, res, next) => {
  try {
    const { blockUserID } = req.params;
    const { blockedUsers } = req.user; // busco en el arrray de seguidores si le sigo o no este usuario

    if (blockedUsers.includes(blockUserID)) {
      //! si lo incluye, quiere decir que está bloqueado por lo que lo dejo de bloquear
      try {
        // 1) como lo quiero dejar de bloquear quito su id del array de los que bloqueo

        await User.findByIdAndUpdate(req.user._id, {
          $pull: {
            blockedUsers: blockUserID,
          },
        });

        return res.status(200).json({
          action: "no longer blocked",
          authUser: await User.findById(req.user._id),
          userSeQuiereSeguir: await User.findById(idUserSeQuiereSeguir),
        });
      } catch (error) {
        return res.status(404).json({
          error:
            "error catch update borrar de blocked users el id que recibo por el param",
          message: error.message,
        });
      }
    } else {
      //! si no lo tengo como blocked, lo añado a bloqueados

      try {
        // 1) como lo quiero bloquear añado su id del array a los bloqueados

        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            blockedUsers: blockUserID,
          },
        });
      } catch (error) {
        return res.status(404).json({
          error: "error catch update bloquear el id que recibo por el param",
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

  blockedUserToggle,
};
