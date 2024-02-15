const { isAuth } = require("../../middleware/auth.middleware");
const {
  createMessage,
  getMessageById,
  getAllMessages,
} = require("../controllers/Message.controllers");

const MessageRoutes = require("express").Router();

MessageRoutes.post("/:idRecipient", [isAuth], createMessage);
MessageRoutes.get("/:id", getMessageById);
MessageRoutes.get("/", getAllMessages);

module.exports = MessageRoutes;
