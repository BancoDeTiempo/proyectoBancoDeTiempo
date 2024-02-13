const Rating = require("../models/Rating.model");
const User = require("../models/User.model");

const createRating = async (req, res, next) => {
  try {
    const { owner, contract, rating } = req.body;
    const { idRated } = req.params;

    const findUser = await User.findById(idRated);

    if (findUser) {
      const newRating = new Rating(req.body);
      const savedRating = await newRating.save();

      try {
        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            ratedForYou: newRating._id,
          },
        });
        try {
          await User.findByIdAndUpdate(idRated, {
            $push: {
              ratedByOthers: newRating._id,
            },
          });

          return res.status(200).json({
            userRating: newRating._id,
            userRated: newRating._id,
          });
        } catch (error) {
          return res.status(404).json({
            error: "Catch error updating ratedByOthers",
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "Catch error updating ratedForYou",
          message: error.message,
        });
      }
    } else {
      await Rating.findByIdAndDelete(savedRating._id);
      return res.status(404).json("Id not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createRating };
