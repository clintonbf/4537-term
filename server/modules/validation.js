export function validateResourceObject(obj) {
    if (!validateTitle(obj.title)) {
        return false;
    }

    if (!validateDescription(obj.description)) {
        return false;
    }

    if (!validateURL(obj.url)) {
        return false;
    }

    if (!validateResourceType(obj.type)) {
        return false;
    }

    return true;
}

export function validateTitle(title) {
    return validateString(title);
}

export function validateDescription(description) {
    return validateString(description);
}

export function validateURL(url) {

}

export function validateResourceType(type) {
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

export function validateId(id) {
    return typeof(id) === 'number';
}

function validateString(string) {
    if (string.length < 256) {
        return true;
    }

    return false;
}