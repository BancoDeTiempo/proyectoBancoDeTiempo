const Message = require("../models/Message.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

//! --------------------------------- UPDATE REVIEW ---------------------------------

const updateReview = async (req, res, next) => {
  console.log("entro");
  await Review.syncIndexes();

  try {
    const { id } = req.params;
    const existReview = await Review.findById(id).populate("owner recipient");

    if (existReview) {
      if (req.user._id.toString() === existReview.owner._id.toString()) {
        console.log("entro paso 1");

        if (req.user._id.toString() != existReview.recipient._id.toString()) {
          console.log("entro paso 2");
          try {
            await Message.findByIdAndUpdate(existReview.reviews, {
              content: req.body.content,
            });
            return res.status(200).json("Review update OK");
          } catch (error) {
            return res.status(404).json({
              error: "Catch error updating review",
              message: error.message,
            });
          }
        }
      } else {
        return res.status(404).json("You don't own this review");
      }
    } else {
      return res.status(404).json("Review not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! --------------------------------- DELETE REVIEW ------------------------------------

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id).populate("owner");

    if (review) {
      if (review.owner._id.toString() == req.user._id.toString()) {
        await Review.findByIdAndDelete(id);

        // --> test ----
        const findByIdReview = await Review.findById(id);

        try {
          const test = await User.updateMany(
            { reviewedByYou: id },
            { $pull: { reviewedByYou: id } }
          );
          console.log(test);

          try {
            await User.updateMany(
              { reviewedByOthers: id },
              { $pull: { reviewedByOthers: id } }
            );

            return res.status(findByIdReview ? 404 : 200).json({
              deleteTest: findByIdReview ? false : true,
            });
          } catch (error) {
            return res.status(404).json({
              error: "Catch error deleting reviewed by others",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "Catch error deleting reviewed by you",
            message: error.message,
          });
        }
      } else {
        return res.status(404).json("tu no eres el propietario ");
      }
    } else {
      return res.status(404).json("la review no existe");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! --------------------------------- GET BY ID ---------------------------------

const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewById = await Review.findById(id);
    if (reviewById) {
      return res.status(200).json(reviewById);
    } else {
      return res.status(404).json("Review not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! --------------------------------- GET ALL ---------------------------------

const getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await Review.find();
    if (allReviews.length > 0) {
      return res.status(200).json(allReviews);
    } else {
      return res.status(404).json("Reviews not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding all reviews",
      message: error.message,
    });
  }
};
module.exports = { updateReview, deleteReview, getReviewById, getAllReviews };
