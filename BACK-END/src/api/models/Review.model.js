const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: String, required: true, unique: false }],
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
