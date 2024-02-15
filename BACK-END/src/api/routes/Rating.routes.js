const { isAuth } = require("../../middleware/auth.middleware");
const {
  createRating,
  updateRating,
  deleteRating,
  getAndUpdateGlobalRating,
} = require("../controllers/Rating.controllers");

const RatingRoutes = require("express").Router();

RatingRoutes.post("/createRating", [isAuth], createRating);
RatingRoutes.patch("/updateRating/:id", [isAuth], updateRating);
RatingRoutes.delete("/:id", [isAuth], deleteRating);
RatingRoutes.patch("/updateGlobalRating", getAndUpdateGlobalRating);

module.exports = RatingRoutes;
