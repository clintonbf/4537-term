const PLAIN_RESOURCE    = '/resources';
const PLAIN_COLLECTION  = '/collections';
const RESOURCE_ID       = PLAIN_RESOURCE + '/{resourceId}';
const COLLECTIONS_ID    = PLAIN_COLLECTION + '/{collectionId}'

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
function postResource(resourceObject) {
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
 * Gets the SQL statement needed to add comment to a resource.
 * 
 * @param {Number} resourceId id of a resource in the DB
 * @param {Object} dataObject information for new resource comment
 * @returns {Object} array of statements 
 */
 function postResourceComment(resourceId, dataObject) {

    let comment = dataObject.comment; 

    let statement = `INSERT INTO resource_comments(resource_id, comment) VALUES (${resourceId}, '${comment}');`; 

    return[statement];
} 


/**
 * Gets SQL statement needed to insert a resource into DB.
 * 
 * @param {Object} resourceObject data to insert
 * @returns  {Object} array of statements to execute in series
 */
function putResource(resourceObject) {
    let statement = `UPDATE resource SET `;

    if (resourceObject.name) {
        statement += `name = '${resourceObject.name}' `;
    }
    if (resourceObject.url) {
        statement += `url = '${resourceObject.url}'`;
    }
    statement += ` WHERE id = '${resourceObject.id}';`
    return [statement]; 
}

/**
 * Gets the SQL statement needed to add a collection.
 * 
 * This statement should be run in conjunction with that in postCollectionPartTwo() (if there are resources to add immediately)
 * 
 * @param {Object} collectionObject Information about new collection
 * @returns {Object} array of statements to execute in series
 */
function postCollectionPartOne(collectionObject) {
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
        ('${collectionObject.title}', '${collectionObject.description}', '${collectionObject.theme}');`
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
        updates.push(`title = '${collectionObject.title}'`);
    }

    if (collectionObject.theme) {
        updates.push(`theme = '${collectionObject.theme}'`);
    }

    if (collectionObject.description) {
        updates.push(`description = '${collectionObject.description}'`);
    }

    for (let i = 0; i < updates.length - 1; i++) {
        statement += updates[i] + ', ';
    }

    statement += updates[updates.length - 1] + ' ';

    statement += `WHERE id = ${collectionObject.id};`;

    return [statement];
}

/**
 * Gets SQL query to delete a collection.
 * 
 * @param {Object} collectionId 
 * @returns {Object} array of statements to execute in series
 */
function deleteCollection(collectionId) {
    let statements = []; 

    let statementOne = `DELETE FROM collection_comments WHERE collection_id = ${collectionId};` 
    let statementTwo = `DELETE FROM collection_resource WHERE collection_id = ${collectionId};` 
    let statementThree = `DELETE FROM collections WHERE id = ${collectionId};`
    
    statements.push(statementOne);
    statements.push(statementTwo);
    statements.push(statementThree);

    return statements; 
}


/**
 * Gets the SQL statement needed to add a comment to a collection. 
 * 
 * @param {Number} collectionId DB id of the collection
 * @param {Object} dataObject information for new collection comment
 * @returns {Object} array of statements 
 */
function postCollectionComment(collectionId, dataObject) {

    let comment = dataObject.comment; 

    let statement = `INSERT INTO collection_comments(collection_id, comment) VALUES (${collectionId}, '${comment}');`; 

    return[statement];
} 

function getRandomResouce() {
    // This don't work
    //SELECT * FROM resources r INNER JOIN resource_comments rc ON r.id = rc.resource_id WHERE r.id = (SELECT id FROM resources ORDER BY RAND() LIMIT 1);

    return [
        "SELECT * FROM resources ORDER BY RAND() LIMIT 1;"
    ];
}


function getResourceComments(resourceId) {
    return [
        `SELECT id, comment
        FROM resource_comments
        WHERE resource_id = ${resourceId};`
    ];
}

function getStatIncrement(method, endpoint) {
    const id = getStatId(endpoint, method);
    
    return [
        `UPDATE stats
        SET hits = hits + 1
        WHERE id = ${id};`
    ];
}

function getStatId(endpoint, method) {
    const POST      = 'POST';
    const GET       = 'GET';
    const PUT       = 'PUT';
    const DELETE    = 'DELETE';
    
    if (method === POST && endpoint === PLAIN_RESOURCE) {
        return 1;
    }

    if (method === PUT && endpoint === PLAIN_RESOURCE) {
        return 2;
    }

    if (method === GET && endpoint === RESOURCE_ID) {
        return 3;
    }

    if (method === DELETE && endpoint === RESOURCE_ID) {
        return 4;
    }

    if (method === POST && endpoint === RESOURCE_ID) {
        return 5;
    }

    if (method === POST && endpoint === PLAIN_COLLECTION) {
        return 6;
    }

    if (method === GET && endpoint === COLLECTIONS_ID) {
        return 7;
    }

    if (method === DELETE && endpoint === COLLECTIONS_ID) {
        return 8;
    }

    if (method === POST && endpoint === COLLECTIONS_ID) {
        return 9;
    }

    if (method === PUT && endpoint === COLLECTIONS_ID) {
        return 10;
    }
}

module.exports = {
    getResource,
    getCollection,
    deleteResource,
    postResource,
    putResource, 
    postResourceComment, 
    addResourcesToCollection,
    postCollectionPartOne,
    postCollectionPartTwo,
    putCollection,
    deleteCollection, 
    postCollectionComment, 
    getRandomResouce,
    getResourceComments,
    getStatIncrement,
    PLAIN_RESOURCE,
    PLAIN_COLLECTION,
    RESOURCE_ID,
    COLLECTIONS_ID
};