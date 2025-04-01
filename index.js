const express = require('express');
const connect_to_db = require('./mongodb.js');
const router = require('./routes.js');

const app = express();
app.use(express.json());

connect_to_db().catch(err => console.log(err));


async function start() {
    try {
        await connect_to_db();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

    app.use(router);
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
}

start().catch(err => console.log(err));