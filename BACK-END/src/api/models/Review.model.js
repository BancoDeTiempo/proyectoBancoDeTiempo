const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
