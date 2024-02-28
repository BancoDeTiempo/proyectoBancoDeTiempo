export const createArray = (numberOfServices) => {
  const array = [];
  for (let i = 1; i <= numberOfServices; i++) {
    array.push(i);
  }
  return array;
};
