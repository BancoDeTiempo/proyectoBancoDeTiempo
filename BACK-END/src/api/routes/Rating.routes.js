const { isAuth } = require("../../middleware/auth.middleware");
const {
  createRating,
  updateRating,
  deleteRating,
  getAndUpdateGlobalRating,
  getAll,
  getById,
} = require("../controllers/Rating.controllers");

const RatingRoutes = require("express").Router();

RatingRoutes.post("/:idRecipient", [isAuth], createRating); // volver a poner [isAuth]
RatingRoutes.patch("/updateRating/:id", [isAuth], updateRating);
RatingRoutes.delete("/:id", [isAuth], deleteRating);
RatingRoutes.patch("/updateGlobalRating/:id", getAndUpdateGlobalRating);
RatingRoutes.get("/", getAll);
RatingRoutes.get("/:id", getById);
module.exports = RatingRoutes;
