const Rating = require("../models/Rating.model");
const User = require("../models/User.model");

const createRating = async (req, res, next) => {
  try {
    const { owner, contract, rating } = req.body;
    const { idRated } = req.params;

    const customBody = {
      owner: req.body?.owner,
      contract: req.body?.contract,
      rating: req.body?.rating,
      ratedUser: idRated,
    };

    const newRating = new Rating(customBody);
    const savedRating = await newRating.save();

    try {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          ratedForYou: savedRating._id, //---------------------> clave a incluir en User.model
        },
      });
      try {
        await User.findByIdAndUpdate(idRated, {
          $push: {
            ratedByOthers: savedRating._id, //---------------------> clave a incluir en User.model
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
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// --------------------------------- UPDATE RATING ------------------------------------

const updateRating = async (req, res, next) => {
  await Rating.syncIndexes();

  try {
    const { id } = req.params;
    const ratingById = await Rating.findById(id);

    if (ratingById) {
      const customBody = {
        rating: req.body?.rating ? req.body?.rating : ratingById.rating,
      };

      try {
        await Review.findByIdAndUpdate(id, customBody);

        // TEST ------------------------------------------------------------------------------

        const ratingByIdUpdate = await Rating.findById(id);

        const elementUpdate = Object.keys(req.body);

        let test = {};

        elementUpdate.forEach((item) => {
          if (req.body[item] === ratingByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }

          let acc = 0;
          for (clave in test) {
            test[clave] == false && acc++;
          }

          if (acc > 0) {
            return res.status(404).json({
              dataTest: test,
              update: false,
            });
          } else {
            return res.status(200).json({
              dataTest: test,
              update: true,
            });
          }
        });
      } catch (error) {
        return res.status(404).json({
          error: "Catch error test",
          message: error.message,
        });
      }
    } else {
      return res.status(404).json({
        error: "Review not found",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// --------------------------------- DELETE RATING ------------------------------------

const deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByIdAndDelete(id);

    // TEST ------------------------------------------------------------------------------

    if (rating) {
      const findByIdRating = await Rating.findById(id);

      try {
        const test = await User.updateMany(
          { ratedForYou: id },
          { $pull: { ratedForYou: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { ratedByOthers: id },
            { $pull: { ratedByOthers: id } }
          );

          return res.status(findByIdRating ? 404 : 200).json({
            deleteTest: findByIdRating ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "Catch error deleting rated by others",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "Catch error deleting rated for you",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { createRating, updateRating, deleteRating };
