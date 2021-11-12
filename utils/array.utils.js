export const removeElement = (indexToRemove, array) =>
    array.filter((_, index) => index != indexToRemove);

export const updateElement = (indexToUpdate, propToUpdate, valueToUpdate, array) =>
    array.map((element, index) =>
        index == indexToUpdate ?
            { ...element, [propToUpdate]: valueToUpdate } :
            element
    );