const express = require('express');
const { getGameController,getGameByIdController, createGameController,deleteGameController, updateGameController } = require('../controllers/Game.controller');
const { createGameValidation,updateGameValidation } = require('../validations/Game-validator');
const router = express.Router();// Creating an instance of Express router

// Route to get all games
router.get('/game', getGameController);

// Route to get a game by its ID
router.post('/gameID', getGameByIdController);

// Route to create a new game with validation middleware
router.post('/game', createGameValidation, createGameController);

// Route to update a game with validation middleware
router.put('/game', updateGameValidation, updateGameController);

// Route to delete a game
router.delete('/game', deleteGameController);

// Exporting the router for use in other parts of the application
module.exports = router;