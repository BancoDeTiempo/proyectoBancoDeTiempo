const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    messages: [{ type: String, required: true, unique: false }],
    userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
