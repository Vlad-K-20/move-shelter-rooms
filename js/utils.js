function clearElementChildren(element) {
    if (element !== null && element !== undefined) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
}

