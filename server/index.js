const USE_DEV_DB = true;

require('dotenv').config();

//Imports
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');

const credentials   = require('./modules/db_credentials');
const queries       = require('./modules/sql_queries');
const validation    = require('./modules/validation');
const outcomes      = require('./modules/http_messages');
const { response }  = require('express');

// HTTP method definitions
const GET       = 'GET';
const POST      = 'POST';
const PUT       = 'PUT';
const DELETE    = 'DELETE;'
const OPTIONS   = 'OPTIONS';

const ENDPOINT_ROOT = '/COMP4537/termproject/API/v1';
const DOMAIN        = 'clintonfernandes.ca';
const RESPONSE_TYPE = 'application/json';
const CORS_DOMAIN   = 'https://emerald-k.ca'

const app = express();

app.use((req, res, next) => {
    // res.header('ACCESS-CONTROL-ALLOW-ORIGIN', '*');
    res.header('ACCESS-CONTROL-ALLOW-METHODS', `${GET, PUT, POST, DELETE, OPTIONS}`);
    res.header('ACCESS-CONTROL-ALLOW-HEADER', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   
    next();
});
app.use(express.json());
app.use(bodyParser());
app.use(cors({ origin: CORS_DOMAIN}));
// app.options('*', cors());

// ********* ROUTES

// ******************* AUTH
app.post('/login', (req, res) => {
    //TODO authenticate 

    const details = {domain : DOMAIN}; 

    const accessToken = jwt.sign(details, process.env.ACCESS_SECRET_TOKEN);

    res.json( {accessToken: accessToken} );
});

// ******************* resources
app.post(`${ENDPOINT_ROOT}/resources`, authenticateToken, (req, res) => {
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
    }).then( () => {
        updateStats(dbConnection, POST, queries.PLAIN_RESOURCE);
    }).catch(err => {
        res.status(405).end(outcomes.RESOURCE_POST_405);
    });
});

app.delete(`${ENDPOINT_ROOT}/resources/:id`, authenticateToken, (req, res) => {
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
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    }).catch(err => {
            res.status(400).end(outcomes.RESOURCE_DELETE_400);
        });
});

app.put(`${ENDPOINT_ROOT}/resources`,  authenticateToken, (req, res) =>{
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);  
    
    const querySet = queries.putResource(req.body); 
    const dataObject = req.body;
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
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).end(outcomes.RESOURCE_PUT_400);
    })
})


app.get(`${ENDPOINT_ROOT}/resources/:id`,  authenticateToken, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);  

    const querySet = queries.getResource(req.params.id); 

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
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).end(outcomes.COLLECTION_GET_400);
    })

});

app.post(`${ENDPOINT_ROOT}/resource/:id`,  authenticateToken, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const id = req.params.id;

    const querySet = queries.postResourceComment(id, req.body);

    console.log(`Query: ${querySet[0]}`);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });

    p.then((affectedRows) => {
        res.type('application/json');
        res.json({ records_updated: affectedRows });
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    }).catch((err) => {
        res.status(400).end(outcomes.COMMENT_POST_400);
    });
})


// ******************* collection
app.get(`${ENDPOINT_ROOT}/collections/:id`, authenticateToken, (req, res) => {
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
    }).then( () => {
        updateStats(dbConnection, GET, queries.COLLECTIONS_ID);
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).end(outcomes.COLLECTION_GET_400);
    })
});

app.post(`${ENDPOINT_ROOT}/collections`, authenticateToken, (req, res) => {
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
    }).then( () => {
        updateStats(dbConnection, POST, queries.PLAIN_COLLECTION);
    }).catch((err) => {
        res.status(405).end(outcomes.COLLECTION_POST_405);
    });
});

app.put(`${ENDPOINT_ROOT}/collections/:id`, authenticateToken, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    const id = req.params.id;
    const dataObject = req.body;
    dataObject.id = id;

    if (!validation.validateCollectionObject(dataObject)) {
        res.status(400).end(outcomes.ALL_BAD_DATA_4xx);
    }

    const querySet = queries.putCollection(dataObject);
    console.log(`Query: ${querySet[0]}`);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });

    p.then((affectedRows) => {
        res.type('application/json');
        res.json({ records_updated: affectedRows });
    }).then( () => {
        updateStats(dbConnection, PUT, queries.COLLECTIONS_ID);
    }).catch((err) => {
        res.status(400).end(outcomes.COLLECTION_PUT_400);
    });
});

app.delete(`${ENDPOINT_ROOT}/collections/:id`,  authenticateToken, (req, res) => {
    console.log("Delete"); 
    
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);
    const id = req.params.id;
    console.log(id); 
    const querySet = queries.deleteCollection(id); 
    console.log(querySet[0]); 

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
        res.json({ outcome: outcomes.COLLECTION_DELETE_201 });
        res.end();
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    })
    .catch(err => {
            res.status(400).end(outcomes.COLLECTION_DELETE_400);
        });
}); 

app.post(`${ENDPOINT_ROOT}/collections/:id`, authenticateToken, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);
    const id = req.params.id;

    const querySet = queries.postCollectionComment(id, req.body);

    console.log(`Query: ${querySet[0]}`);

    let p = new Promise((resolve, reject) => {
        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });

    p.then((affectedRows) => {
        res.type('application/json');
        res.json({ records_updated: affectedRows });
    }).then( () => {
        updateStats(dbConnection, DELETE, queries.RESOURCE_ID);
    }).catch((err) => {
        res.status(400).end(outcomes.COMMENT_POST_400);
    });
})

app.get(`${ENDPOINT_ROOT}/admin/stats`,  authenticateToken, (req, res) => {
    const query = `SELECT * FROM stats ORDER BY id;`;

    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    let p = new Promise( (resolve, reject) => {
        dbConnection.query(query, (err, result) => {
            if (err) {
            reject(err);
        } else {
            resolve(result);
        }
        });
    });

    p.then( (result) => {
        res.type(RESPONSE_TYPE);
        res.json(result);
    }).catch( err => {
        console.error(err);
        res.status(500).end("Unknown error");
    });

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.status(401).send(outcomes.UNAUTHORIZED);
    }

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, details) => {
        if (err) {
            return res.status(403).send(outcomes.INVALID_TOKEN);
        }

        if (details.domain !== DOMAIN) {
            return res.status(401).send(outcomes.UNAUTHORIZED);
        }
    
        next();
    });
}

function updateStats(dbConnection, method, endpoint) {
    let p = new Promise( (resolve, reject) => {
        const querySet = queries.getStatIncrement(method, endpoint);

        dbConnection.query(querySet[0], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    return p;
}

app.listen(3000);


