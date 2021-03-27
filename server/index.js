//Imports
const express = require('express');
const credentials = require('./modules/db_credentials');
const queries = require('./modules/sql_queries');

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

// *************** ROUTES

app.post(`${ENDPOINT_ROOT}/resources`, (req, res) => {
    const dbConnection = credentials.getDbConnection(USE_DEV_DB);

    let data = req.body;

    let p = new Promise((resolve, reject) => {
        dbConnection.query(queries.postResource(data), (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertID);
            }
        });

    });

    p.then((newInsertId) => {
        res.status(201).send(`New id: ${newInsertId}`)
    }).catch(err => {
        throw err;
    });
})

