require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.MONGO_URL;
const DB_NAME = "test";
function getDB() {
    MongoClient.connect(CONNECTION_STRING, {
        useUnifiedTopology: true
    }, async (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database');
        return db = await client.db(DB_NAME);
        
    });
}
module.exports = getDB;
