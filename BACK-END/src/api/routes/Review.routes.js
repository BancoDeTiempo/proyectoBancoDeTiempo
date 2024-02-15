const { isAuth } = require("../../middleware/auth.middleware");
const {
  updateReview,
  deleteReview,
  getReviewById,
  getAllReviews,
} = require("../controllers/Review.controllers");

const ReviewRoutes = require("express").Router();

ReviewRoutes.patch("/:id", [isAuth], updateReview);
ReviewRoutes.delete("/:id", [isAuth], deleteReview);
ReviewRoutes.get("/:id", getReviewById);
ReviewRoutes.get("/", getAllReviews);

module.exports = ReviewRoutes;
