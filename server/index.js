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
    socket.on('login', async (name) => {
        console.log("Emit from ", name);
        const user = await db.collection("users").findOne({name});
        if (!user) {
            console.log("No user found");
            const newUser = await db.collection("users").insertOne({
                name,
                joules: 1, 
                passive_items: [], 
                max_combo: 0, 
                skill_items: [],
                prestige: 0 
            });
            console.log(newUser);
        }
        socket.on('buy', async (payload)=> {
            const user = await db.collection("users").updateOne({_id:payload._id}, {$push: {item: payload.item}});
        });
        socket.on('update', async (payload)=> {
            db.collection("users").find({id:payload._id});
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})