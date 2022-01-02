export const removeElement = <T>(indexToRemove: number, array: T[]) =>
    array.filter((_, index) => index != indexToRemove);

export const updateElement = <T, K extends keyof T>(indexToUpdate: number, propToUpdate: K, valueToUpdate: T[K], array: T[]): T[] =>
    array.map((element, index) =>
        index == indexToUpdate ?
            { ...element, [propToUpdate]: valueToUpdate } :
            element
    );

export const lastElementOf = <T>(array: readonly T[]): T | undefined =>
    array[array.length - 1];
export const firstElementOf = <T>(array: T[]): T | undefined =>
    array[0];

export const isEmpty = <T>(array: T[] | []): array is [] =>
    array.length === 0;
export const notEmpty = <T>(array: T[] | []): array is T[] =>
    !isEmpty(array);

export const sortBy = <T>(comparator: Comparator<T>) =>
    (array: T[]): T[] =>
        [...array].sort(comparator);

interface Comparator<T> {
    (a: T, b: T): number;
}

export const randomElementOf = <T>(array: readonly T[]): T =>
    array[Math.floor(Math.random() * array.length)];
