const express = require("express");
const { isAuth, isAuthAdmin, isAuthSuperAdmin } = require("../../middleware/auth.middleware");

const { upload } = require("../../middleware/files.middleware");
const { register,
  resendCode,
  sendCode,
  login,
  autoLogin,
  checkNewUser,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser, } = require("../controllers/User.controllers");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/forgotpassword", changePassword);
UserRoutes.delete("/", [isAuth], deleteUser);

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);

/// REDIRECT
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
