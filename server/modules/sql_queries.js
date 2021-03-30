/**
 * SQL DB queries stored here
 */

/**
 * Gets SQL statement(s) necessary to get a resource.
 * @param {Number} id id of resource in DB
 * @returns {Object} array of statements to execute in series
 */
function getResource(id) {
    return [`SELECT *
            FROM resources r, resource_comments rc
            WHERE r.id = ${id};`];
}

/**
 * Gets SQL statement(s) necessary to get a collection.
 * 
 * @param {Number} id id of collection in DB
 * @returns {Object} array of statements to execute in series
 */
function getCollection(id) {
    return [
        `SELECT c.id as collection_id, c.title, c.description as c_description, c.theme, r.url, r.description AS r_description
        FROM collections c, resources r
        WHERE c.id = ${id}
        AND r.id IN (
            SELECT r.id
            FROM resources r, collection_resources cr
            WHERE cr.collection_id = ${id}
            AND r.id = cr.resource_id
        );`
    ];
}

/**
 * Gets SQL statement(s) necessary to delete a resource.
 * 
 * @param {Number} id id of resource in DB
 * @returns {Object} array of statements to execute in series
 */
 function deleteResource(id) {
    const statements = [];

    let statementOne =
        `DELETE FROM resource_comments
    WHERE id = ${id};`

    let statementTwo =
        `DELETE FROM collection_resources
    WHERE resource_id = ${id};`

    let statementThree =
        `DELETE FROM resources
    WHERE id = ${id};`

    statements.push(statementOne);
    statements.push(statementTwo);
    statements.push(statementThree);

    return statements;
}

/**
 * Gets SQL statement needed to insert a resource into DB.
 * 
 * @param {Object} resourceObject data to insert
 * @returns  {Object} array of statements to execute in series
 */
function postResource (resourceObject) {
    if (!resourceObject.title) {
        resourceObject.title = null;
    }

    if (!resourceObject.description) {
        resourceObject.description = null;
    }

    return [
        `INSERT INTO resources
        (url, type, title, description)
        VALUES
        ('${resourceObject.url}', '${resourceObject.type}', '${resourceObject.title}', '${resourceObject.description}');`
    ];
}

/**
 * Gets the SQL statement needed to add a collection.
 * 
 * This statement should be run in conjunction with that in postCollectionPartTwo() (if there are resources to add immediately)
 * 
 * @param {Object} collectionObject Information about new collection
 * @returns {Object} array of statements to execute in series
 */
function postCollectionPartOne (collectionObject) {
    if (!collectionObject.theme) {
        collectionObject.theme = null;
    }

    if (!collectionObject.description) {
        collectionObject.description = null;
    }

    return [
        `INSERT INTO collections
        (title, description, theme)
        VALUES
        (${collectionObject.title}, ${collectionObject.description}, ${collectionObject.theme})`
    ];
}

/**
 * Gets the SQL statement needed to add resources to a collection.
 * 
 * @param {Number} collectionId DB id of the collection
 * @param {Object} resourceIds array of DB resource ids to add
 * @returns {Object} array of statements to execute in series
 */
function postCollectionPartTwo(collectionId, resourceIds) {
    let statement = 
    `INSERT INTO collection_resources
    (collection_id, resource_id)
    VALUES`;

    for (let i = 0; i < resourceIds.length - 1; i++) {

        let append = `(${collectionId}, ${resourceIds[i]}),`
        statement += append;
    }

    statement += `(${collectionId}, ${resourceIds[resourceIds.length - 1]});`;

    return [statement];
}

/**
 * Gets the SQL statement needed to add resources to a collection.
 * 
 * This function is just a wrapper for postCollectionPartTwo and its presence is purely for readability.
 * 
 * @param {Number} collectionId DB id of the collection
 * @param {Object} resourceIds array of DB resource ids to add
 * @returns {Object} array of statements to execute in series
 */
function addResourcesToCollection(collectionId, resourceIds) {
    postCollectionPartTwo(collectionId, resourceIds);
}

/**
 * Gets SQL query to update a collection.
 * 
 * @param {Object} collectionObject 
 * @returns {Object} array of statements to execute in series
 */
function putCollection(collectionObject) {
    let updates = [];
    let statement = `UPDATE collections SET `;

    if (collectionObject.title) {
        updates.push(
            `title = ${collectionObject.title}`
        );
    }

    if (collectionObject.theme) {
        updates.push(
            `theme = ${collectionObject.theme}`
        );
    }

    if (collectionObject.description) {
        updates.push(
            `description = ${collectionObject.description}`
        );
    }

    for (let i = 0; i < updates.length - 1; i++) {
        statement += updates[i] + ', ';
    }

    statement += updates[updates.length] + ' ';
    
    statement +=`WHERE id = ${collectionObject.id};`;

    return [statement];

}

module.exports = {
    getResource,
    getCollection,
    deleteResource,
    postResource,
    postCollectionPartOne,
    postCollectionPartTwo,
    addResourcesToCollection,
    putCollection
};