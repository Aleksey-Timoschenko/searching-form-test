const ZERO_LENGTH = 0;

export const isObjectEmpty = value => {
    if (!value) {
        return true;
    }

    return (
        Object.keys(value).length === ZERO_LENGTH
    )
}