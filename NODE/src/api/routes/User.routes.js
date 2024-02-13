const express = require("express");
const {
  register,
  resendCode,
  sendCode,
  login,
  autoLogin,
  checkNewUser,
  changePassword,
  sendPassword,
  modifyPassword,
} = require("../controllers/User.contollers");
const { upload } = require("../../middleware/files.middleware");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/resend", resendCode);

UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.post("/check", checkNewUser);
UserRoutes.patch("/forgotpassword", changePassword);

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);

UserRoutes.get("/register/sendMail/:id", sendCode);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
