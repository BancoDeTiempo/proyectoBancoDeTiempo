const express = require("express");
const {
  register,
  resendCode,
  sendCode,
  login,
  autoLogin,
} = require("../controllers/User.contollers");
const { upload } = require("../../middleware/files.middleware");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/resend", resendCode);
UserRoutes.get("/register/sendMail/:id", sendCode);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);

module.exports = UserRoutes;
