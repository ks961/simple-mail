

export function makeReadOnly<T>(obj: T): Readonly<T> {
    return Object.freeze(obj);
}

export function isInDevelopmentMode() {
    return process.env.NODE_ENV === "development";
}