const Review = require("../models/Review.model");
const User = require("../models/User.model");

// --------------------------------- UPDATE REVIEW ------------------------------------

const updateReview = async (req, res, next) => {
  await Review.syncIndexes();

  try {
    const { id } = req.params;
    const reviewById = await Review.findById(id);

    if (reviewById) {
      const customBody = {
        _id: reviewById._id,
        userOne: req.body?.userOne,
        usertwo: req.body?.userTwo,
        reviews: req.body?.reviews ? req.body?.reviews : reviewById.reviews,
      };

      try {
        await Review.findByIdAndUpdate(id, customBody);

        // TEST ------------------------------------------------------------------------------

        const reviewByIdUpdate = await Review.findById(id);

        const elementUpdate = Object.keys(req.body);

        let test = {};

        elementUpdate.forEach((item) => {
          if (req.body[item] === reviewByIdUpdate[item]) {
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

// --------------------------------- DELETE REVIEW ------------------------------------

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    // TEST ------------------------------------------------------------------------------

    if (review) {
      const findByIdReview = await Review.findById(id);

      try {
        const test = await User.updateMany(
          { reviewedForYou: id },
          { $pull: { reviewedForYou: id } }
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
          error: "Catch error deleting reviewed for you",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { updateReview, deleteReview };
