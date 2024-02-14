const calculateAverageRating = (ratings) => {
  if (ratings.length === 0) {
    return 0;
  }

  const sumOfRatings = ratings.reduce((total, rating) => {
    return total + rating.rating;
  }, 0);

  const averageRating = sumOfRatings / ratings.length;
  return averageRating;
};

module.exports = { calculateAverageRating };
