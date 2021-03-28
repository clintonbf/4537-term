//Imports
const express = require('express');
const credentials = require('./modules/db_credentials');
const queries = require('./modules/sql_queries');
const validation = require('./modules/validation');
const outcomes = require('./modules/http_messages');

// HTTP method definitions
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE;'
const OPTIONS = 'OPTIONS';

const ENDPOINT_ROOT = '/API/v1';

const USE_DEV_DB = true;

const app = express();

app.use((req, res, next) => {
    res.header('ACCESS-CONTROL-ALLOW-ORIGIN', '*');
    res.header('ACCESS-CONTROL-ALLOW-METHODS', `${GET, PUT, POST, DELETE, OPTIONS}`);
    res.header('ACCESS-CONTROL-ALLOW-HEADER', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
});

app.use(express.bodyParser());

// ********* ROUTES

// ******************* resources
app.post(`${ENDPOINT_ROOT}/resources`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    let data = req.body;

    const querySet = queries.postResource(data);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertID);
            }
        });

    });

    p.then((newInsertId) => {
        res.status(201).end(outcomes.RESOURCE_POST_201);
    }).catch(err => {
        res.status(405).end(outcomes.RESOURCE_POST_405);
    });
});

app.delete(`${ENDPOINT_ROOT}/resources/:id`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const id = req.params.id;

    const querySet = queries.deleteResource(id);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });

    p.then((id) => {
        dbConnection.query(querySet[1]);
    }).then((id) => {
        dbConnection.query(querySet[2]);
    }).then((id) => {
        res.status(204).end(outcomes.RESOURCE_DELETE_201);
    }).
        catch(err => {
            res.status(400).end(outcomes.RESOURCE_DELETE_400);
        });

});


// ******************* collection
app.get(`${ENDPOINT_ROOT}/collections/:id`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    if (!validation.validateId(req.params.id)) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
    }

    const querySet = queries.getCollection(req.params.id);

    const p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(query.results);
            }
        });
    });

    p.then(data => {
        res.status(204).send(outcomes.COLLECTION_GET_200);
        res.end(data);
    }).catch(err => {
        res.status(400).end(outcomes.COLLECTION_GET_400);
    })
});

app.post(`${ENDPOINT_ROOT}/collections`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const collectionObj = req.body.collection;

    if (!validation.validateResourceObject(collectionObj)) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
    }

    const querySetOne = queries.postCollectionPartOne(collectionObj);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySetOne[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertID);
            }
        });
    });

    p.then(newId => {
        const resourceLinks = req.body.resourceLinks;

        const querySetTwo = queries.postCollectionPartTwo(newId, resourceLinks);

        dbConnection.query(querySetTwo[0]);
    }).then( (newId) => {
        res.status(201).end(outcomes.COLLECTION_POST_201);
    }).catch( (err) => {
        res.status(405).end(outcomes.COLLECTION_POST_405);
    });
});

app.put(`${ENDPOINT_ROOT}/collections/:id`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const id = req.params.id;

    const dataObject = req.body;

    if (!validation.validateResourceObject(dataObject)) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
    }

    dataObject.id = id;

    const querySet = queries.putCollection(dataObject);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });

    p.then((id) => {
        res.status(204).end(outcomes.COLLECTION_PUT_204);
    }).catch((err) => {
        res.status(400).end(outcomes.COLLECTION_PUT_400);
    });
});