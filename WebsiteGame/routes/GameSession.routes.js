const express = require('express');
const { getGameSessionController,getGameSessionByIdController, createGameSessionController,updateGameSessionController ,deleteGameSessionController} = require('../controllers/GameSession.controller');
const { createGameSessionValidation,updateGameSessionValidation } = require('../validations/GameSession-validator');
const router = express.Router();// Creating an instance of Express router

// Route to get all game sessions
router.get('/gameSession', getGameSessionController);

// Route to get a game session by its ID
router.post('/gameSessionID', getGameSessionByIdController);

// Route to create a new game session with validation middleware
router.post('/gameSession', createGameSessionValidation, createGameSessionController);

// Route to update a game session with validation middleware
router.put('/gameSession', updateGameSessionValidation, updateGameSessionController);

// Route to delete a game session
router.delete('/gameSession', deleteGameSessionController);

// Exporting the router for use in other parts of the application
module.exports = router;