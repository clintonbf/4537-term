function validateResourceObject(obj) {
    if (obj.title && !validateTitle(obj.title)) {
        return false;
    }

    if (obj.description && !validateDescription(obj.description)) {
        return false;
    }

    if (obj.url && !validateURL(obj.url)) {
        return false;
    }

    if (obj.type && !validateResourceType(obj.type)) {
        return false;
    }

    return true;
}


function validateCollectionObject(obj) {
    if (obj.title && !validateTitle(obj.title)) {
        return false;
    }

    if (obj.description && !validateDescription(obj.description)) {
        return false;
    }

    if (obj.theme && !validateTheme(obj.theme)) {
        return false;
    }

    return true;
}

function validateTheme(theme) {
    return validateString(theme);
}

function validateTitle(title) {
    return validateString(title);
}

function validateDescription(description) {
    return validateString(description);
}

function validateURL(url) {

}

function validateURL(type) {
    const resourceTypes = Object.freeze(
        {
            ARTICLE: "article",
            VIDEO: "video"
        }
    );

    if (Object.values(resourceTypes).includes(type)) {
        return true;
    }

    return false;
}

function validateId(id) {
    return typeof(id) === 'number';
}

function validateString(string) {
    if (string.length < 256) {
        return true;
    }

    return false;
}

module.exports = {
    validateResourceObject,
    validateCollectionObject,
    validateTitle,
    validateDescription,
    validateURL,
    validateId
};