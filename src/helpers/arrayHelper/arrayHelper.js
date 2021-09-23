const ZERO_LENGTH = 0;

export const isArrayEmpty = value => {
    if (!Array.isArray(value)) {
        return true;
    }

    return (
        value.length === ZERO_LENGTH
    )
}