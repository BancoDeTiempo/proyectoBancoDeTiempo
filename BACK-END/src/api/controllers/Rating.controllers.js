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
          userTwo: findUser._id.toString(),
        }).populate("userOne state");
        console.log(contractExist);
        if (
          contractExist.userOne.toString() == req.user._id.toString() &&
          contractExist.state == "en curso"
        ) {
          try {
            const newRating = new Rating({
              owner: req.user._id,
              ratedUser: findUser._id,
              contract: contractExist._id,
              rating: req.body.rating,
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
                  await User.findByIdAndUpdate(findUser._id, {
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
          } catch (error) {
            return res.status(404).json("no has creado nada");
          }
        } else {
          return res.status(404).json("se ha roto");
        }
      } catch (error) {
        return res.status(404).json("Contract not found");
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
      messagge: error.message,
    });
  }
};

// --------------------------------- UPDATE RATING ------------------------------------>>> ESTO DEBERIA FUNCIONAR. ADAPTADO DE PEDRO

const updateRating = async (req, res, next) => {
  await Rating.syncIndexes();

  try {
    const { id } = req.params;
    const existRating = await Rating.findById(id).populate("owner ratedUser");

    if (existRating) {
      if (req.user._id.toString() === existRating.owner._id.toString()) {
        console.log("entro paso 1");

        if (req.user._id.toString() != existRating.ratedUser._id.toString()) {
          console.log("entro paso 2");
          try {
            await Rating.findByIdAndUpdate(existRating, {
              rating: req.body.rating,
            });
            return res.status(200).json("Rating update OK");
          } catch (error) {
            return res.status(404).json({
              error: "Catch error updating review",
              message: error.message,
            });
          }
        }
      } else {
        return res.status(404).json("You don't own this rating");
      }
    } else {
      return res.status(404).json("Rating not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// --------------------------------- DELETE RATING ------------------------------------>>> ESTO DEBERIA FUNCIONAR. ADAPTADO DE PEDRO

const deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findById(id).populate("owner");

    if (rating) {
      if (rating.owner._id.toString() == req.user._id.toString()) {
        await Rating.findByIdAndDelete(id);

        // TEST ------------------------------------------------------------------------------

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
      } else {
        return res.status(404).json("You can't change this rating");
      }
    } else {
      return res.status(404).json("Rating not found");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

// --------------------------------- UPDATE GLOBAL RATING ------------------------------------>>>>> SURPRISE!!!!

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
