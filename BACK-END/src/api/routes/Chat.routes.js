const { getChatById, getAllChats } = require("../controllers/Chat.controller");

const ChatRoutes = require("express").Router();

ChatRoutes.get("/:id", getChatById);
ChatRoutes.get("/", getAllChats);

module.exports = ChatRoutes;
