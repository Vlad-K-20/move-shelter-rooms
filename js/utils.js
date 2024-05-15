function clearElementChildren(element) {
    if (element !== null && element !== undefined) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
}

/**
 * Returns random number in range including both range ends.
 * @param min minimum number in the range
 * @param max maximum number in the range
 * @returns {*} random number
 */
function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
