const {
  updateReview,
  deleteReview,
} = require("../controllers/Review.controllers");

const ReviewRoutes = require("express").Router();

ReviewRoutes.patch("/:id", updateReview);
ReviewRoutes.delete("/:id", deleteReview);

module.exports = ReviewRoutes;
