const Contract = require("../models/Contract.model");
const Rating = require("../models/Rating.model");
const User = require("../models/User.model");

const createRating = async (req, res, next) => {
  await Rating.syncIndexes();

  try {
    const { owner, rating, contract } = req.body;
    const { idRecipient } = req.params;

    const findUser = await User.findById(idRecipient);

    if (findUser) {
      try {
        const contractExist = await Contract.findOne({
          userOne: req.user._id,
          userTwo: findUser._id,
        }).populate("acceptedContract completeService");
        console.log("entro");

        if (contractExist) {
          const newRating = new Rating({
            owner: req.user._id,
            rating: req.body.rating,
            contract: contractExist._id,
            ratedUser: findUser._id,
          });
          try {
            await newRating.save();

            try {
              await User.findByIdAndUpdate(req.user._id, {
                $push: {
                  ratedByYou: newRating._id,
                },
              });

              try {
                await User.findByIdAndUpdate(findUser, {
                  $push: {
                    ratedByOthers: newRating._id,
                  },
                });

                return res
                  .status(200)
                  .json("EVERYTHING WORKS, YOU ARE A FUCKING GENIUS");
              } catch (error) {
                return res.status(404).json({
                  error: "Catch error updating rated by others",
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(404).json({
                error: "Catch error updating rated by you",
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error: "Catch error saving the new rating",
              message: error.message,
            });
          }
        } else {
          return res.status(404).json({
            error: "There is something wrong with the keys in new rating",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "There is no contract between these Users",
          message: error.message,
        });
      }
    } else {
      return res.status(404).json({
        error: "User not found",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "TODO MAL",
      message: error.message,
    });
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

// --------------------------------- UPDATE GLOBAL RATING ------------------------------------

const getAndUpdateGlobalRating = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId).populate("ratedByOthers");

    if (user) {
      const ratings = user.ratedByOthers;
      const averageRating = calculateAverageRating(ratings);

      try {
        user.globalRating = averageRating;
        await user.save();
      } catch (error) {
        return res.status(404).json({
          error: "Catch error updating globalRating",
          message: error.message,
        });
      }
      return res.status(200).json({ averageRating });
    } else {
      return res.status(404).json({
        error: "User not found",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//!-------
//? GET ALL
//!-------

const getAll = async (req, res, next) => {
  try {
    const allRating = await Rating.find();

    if (allRating.length > 0) {
      return res.status(200).json(allRating);
    } else {
      return res.status(404).json("Rating no found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error to get rating",
      message: error.message,
    });
  }
};

//!-------
//? GET BY ID
//!-------

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ratingById = await Rating.findById(id);
    if (ratingById) {
      return res.status(200).json(ratingById);
    } else {
      return res.status(404).json("Rating not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  getAndUpdateGlobalRating,
  getAll,
  getById,
};
