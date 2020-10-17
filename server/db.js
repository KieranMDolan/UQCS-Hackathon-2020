require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.MONGO_URL;
function getDB() {
    MongoClient.connect(CONNECTION_STRING, {
        useUnifiedTopology: true
    }, async (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database');
        return db = await client.db("heart-attack");
        
    });
}
module.exports = getDB;
