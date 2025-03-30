const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri_mongodb = process.env.URI_MONGO_DB ;

connect_to_db().catch(err => console.log(err));

async function connect_to_db() {
    await mongoose.connect(uri_mongodb, {});
}

module.exports = connect_to_db;