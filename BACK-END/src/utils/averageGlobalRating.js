const calculateAverageRating = (ratings) => {
  let sumOfRatings = ratings.reduce((total, rating) => total + rating, 0);

  let averageRating = sumOfRatings / ratings.length;
  return averageRating;
};

module.exports = { calculateAverageRating };
