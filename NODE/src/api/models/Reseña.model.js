const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReseñaSchema = new Schema(
  {
    userPosted: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userReceiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: [{ type: Number }],
    message: [{ type: String, required : true, unique : false }],
  },
  {
    timestamps: true,
  }
);

const Reseña = mongoose.model("Reseña", ReseñaSchema);
module.exports = Reseña;

