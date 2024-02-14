//const { isAuth } = require("../../middleware/"); //todo: hasta que no haya un auth.middle no puedes usarlo
const { createMessage } = require("../controllers/Message.controllers");

const MessageRoutes = require("express").Router();

//MessageRoutes.post("/:", [isAuth], createMessage);//todo: actualizar cuando se tenga el modelo de user

module.exports = MessageRoutes;
