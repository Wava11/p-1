export const isDefined = <T>(input: undefined | null | T): input is T =>
    input !== null && input !== undefined;

export const dissoc = <T, K extends keyof T>(key: K,obj: T): Omit<T, K> => {
    const cloned = { ...obj };
    delete cloned[key];
    return cloned
};