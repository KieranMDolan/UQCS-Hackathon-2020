require('dotenv').config();
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');
const PORT = process.env.PORT || 3001;

const MongoClient = require('mongodb').MongoClient;
const CONNECTION_STRING = process.env.MONGO_URL;
let db;
MongoClient.connect(CONNECTION_STRING, {
    useUnifiedTopology: true
}, async (err, client) => {
    if (err) return console.error(err)
    db = await client.db(process.env.DB_NAME);
    console.log('Connected to Database')
});

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(helmet());

app.use(express.static(__dirname + '/public')); //Serves resources from public folder

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname+'/../client/build/index.html'));
    res.json({message:"this the api"});
})

app.get('/api', async(req, res)=> {
    res.json({message: "PINGING ✔"});
});

app.get('/resources/passive_items', async (req, res)=> {
    const result = await db.collection("passive_items").find({}).toArray();
    console.log(result);
    return res.json(result);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('login', (name) => {
        const user = db.collection("users").findAndModify({
            query: {name},
            update: {
                $setOnInsert: {
                    // name, 
                    joules: 1, 
                    passive_items: [], 
                    max_combo: 0, 
                    prestege_items: [], 
                }
            },
            new: true,   // return new doc if one is upserted
            upsert: true // insert the document if it does not exist
        });
        console.log(user);
        socket.on('update', (payload)=> {
            db.collection("users").find({id:payload._id});
        });
    });
    
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})