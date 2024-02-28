export const createArray = (numberOfServices) => {
    const array = []
    for (i = 1; i <= numberOfServices; i++) {
        array.push(i)
    }
    return array;
}