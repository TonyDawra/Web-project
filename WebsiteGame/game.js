// Importing required modules and configurations
const express = require("express");
const config = require("./database/config");
const { query } = require("./database/db");
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');

// Setting up the port for the server to listen on, defaulting to 3001 if not provided in the environment
const port = process.env.PORT || 3001;

// Creating an instance of the Express application
const app = express();

// Configuring middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring Cross-Origin Resource Sharing (CORS) middleware to allow requests from any origin
app.use(cors({origin: '*'}));

// Importing routes for user-related operations
const users = require('./routes/Users.routes');

// Handling a basic GET request at the root URL
app.get("/", (req, res)=>{
    res.status(200).json({message: "This is the index page"});
});

// Using the imported user routes for paths starting with '/api/users'
app.use('/api/users', users);

// Importing routes for game score-related operations
const gameScore = require('./routes/GameScore.routes');
app.use('/api/gameScore', gameScore);

// Importing routes for game session-related operations
const gameSession = require('./routes/GameSession.routes');
app.use('/api/gameSession', gameSession);

// Importing routes for game-related operations
const games = require('./routes/Game.routes');
app.use('/api/games', games);

// Setting up the server to listen on the specified port
app.listen(port, ()=>{
    console.log(`My app is listening on port ${port}`);
});
