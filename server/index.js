//Imports
const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser());

// ********* ROUTES

// ******************* resources
app.post(`${ENDPOINT_ROOT}/resources`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const querySet = queries.postResource(req.body);

    console.log(`Query: ${querySet[0]}`);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId);
            }
        });

    });

    p.then((newInsertId) => {
        res.type('application/json');
        res.json({ inserted_id: newInsertId });
    }).catch(err => {
        res.status(405).end(outcomes.RESOURCE_POST_405);
    });
});

app.delete(`${ENDPOINT_ROOT}/resources/:id`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const id = req.params.id;

    const querySet = queries.deleteResource(id);

    let p = new Promise((resolve, reject) => {
        console.log(`Query 1: ${querySet[0]}`);
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });

    p.then((id) => {
        console.log(`Query 2: ${querySet[1]}`);

        dbConnection.query(querySet[1]);
    }).then((id) => {
        console.log(`Query 3: ${querySet[2]}`);

        dbConnection.query(querySet[2]);
    }).then((id) => {
        res.type('application/json');
        res.json({ outcome: outcomes.RESOURCE_DELETE_201 });
        res.end();
    }).
        catch(err => {
            res.status(400).end(outcomes.RESOURCE_DELETE_400);
        });
});


// ******************* collection
app.get(`${ENDPOINT_ROOT}/collections/:id`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    if (!validation.validateId(parseInt(req.params.id))) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
    }

    const querySet = queries.getCollection(req.params.id);

    console.log(`Query: "${querySet[0]}"`);

    const p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    p.then(data => {
        res.type('application/json');
        res.send(data);
        res.end();
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).end(outcomes.COLLECTION_GET_400);
    })
});

app.post(`${ENDPOINT_ROOT}/collections`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const collectionObj = req.body.collection;
    let newCollectionId;

    if (!validation.validateCollectionObject(collectionObj)) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
        return;
    }

    const querySetOne = queries.postCollectionPartOne(collectionObj);
    console.log(`First query: ${querySetOne[0]}`);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySetOne[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                newCollectionId = result.insertId
                resolve(newCollectionId);
            }
        });
    });

    p.then(newId => {
        const resourceIds = req.body.resources;

        const querySetTwo = queries.postCollectionPartTwo(newId, resourceIds);
        console.log(`Second query: ${querySetTwo[0]}`);
        dbConnection.query(querySetTwo[0]);
    }).then(() => {
        res.type('application/json');
        res.json({ inserted_id: newCollectionId });

    }).catch((err) => {
        res.status(405).end(outcomes.COLLECTION_POST_405);
    });
});

app.put(`${ENDPOINT_ROOT}/collections/:id`, (req, res) => {
    let body;
    req.on('data', (chunk) => {
        if (chunk) {
            body += chunk;
        }
    });

    req.on('end', () => {
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
});

app.listen(3000);