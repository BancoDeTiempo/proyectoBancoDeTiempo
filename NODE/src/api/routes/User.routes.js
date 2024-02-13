const express = require("express");
const { register, resendCode } = require("../controllers/User.contollers");
const { upload } = require("../../middleware/files.middleware");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/resend", resendCode);

module.exports = UserRoutes;
