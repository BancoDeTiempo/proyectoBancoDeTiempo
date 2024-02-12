const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
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

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

