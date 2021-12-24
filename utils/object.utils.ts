export const dissoc = <T, K extends keyof T>(key: K, obj: T): Omit<T, K> => {
    const cloned = { ...obj };
    delete cloned[key];
    return cloned;
};

export const isPropOf = <T extends {}>(key: string | number, obj: T): boolean =>
    key in obj;


interface Filter<T, K extends keyof T> extends Mapper<T, K, boolean> { }
interface Mapper<T, K extends keyof T, O> {
    (key: K, value: T[K]): O;
}

export const filterObject = <T extends {}>(filter: Filter<T, keyof T>, obj: T): Partial<T> =>
    (Object.keys(obj) as (keyof T)[])
        .reduce((filteredObj, currentKey: keyof T) => {
            const x = filter(currentKey, obj[currentKey]) ? { [currentKey]: obj[currentKey] } : {};
            return {
                ...filteredObj,
                ...x
            };
        }, {});
export const mapObject = <T extends {}, O>(mapper: Mapper<T, keyof T, O>, obj: T): Record<keyof T, O> =>
    (Object.keys(obj) as (keyof T)[])
        .reduce((mappedObj, currentKey: keyof T) => ({
            ...mappedObj,
            [currentKey]: mapper(currentKey, obj[currentKey])
        }), {}) as Record<keyof T, O>;

