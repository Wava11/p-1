export const isDefined = <T>(input: undefined | null | T): input is T =>
    input !== null && input !== undefined;

export type Result<T, E extends Error> = T | E;
