const { isAuth } = require("../../middleware/auth.middleware");
const {
  updateReview,
  deleteReview,
} = require("../controllers/Review.controllers");

const ReviewRoutes = require("express").Router();

ReviewRoutes.patch("/:id", [isAuth], updateReview);
ReviewRoutes.delete("/:id", [isAuth], deleteReview);

module.exports = ReviewRoutes;
