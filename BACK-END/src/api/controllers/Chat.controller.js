const mongoose = require("mongoose");
const Chat = require("../models/Chat.model");
const Schema = mongoose.Schema;

//! --------------------------------- GET BY ID ---------------------------------

const getChatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const chatById = await Chat.findById(id);
    if (chatById) {
      return res.status(200).json(chatById);
    } else {
      return res.status(404).json("Chat not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! --------------------------------- GET AL ---------------------------------

const getAllChats = async (req, res, next) => {
  try {
    const allChats = await Chat.find();
    if (allChats.length > 0) {
      return res.status(200).json(allChats);
    } else {
      return res.status(404).json("Chats not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding all chats",
      message: error.message,
    });
  }
};
module.exports = { getChatById, getAllChats };
