const express = require('express');
const { getGameScoreController,getGameScoreByIdController, createGameScoreController,deleteGameScoreController, updateGameScoreController } = require('../controllers/GameScore.controller');
const { createGameScoreValidation,updateGameScoreValidation } = require('../validations/GameScore-validator');
const router = express.Router();// Creating an instance of Express router

// Route to get all game scores
router.get('/gameScore', getGameScoreController);

// Route to get a game score by its ID
router.post('/gameScoreID', getGameScoreByIdController);

// Route to create a new game score with validation middleware
router.post('/gameScore', createGameScoreValidation, createGameScoreController);

// Route to update a game score with validation middleware
router.put('/gameScore', updateGameScoreValidation, updateGameScoreController);

// Route to delete a game score
router.delete('/gameScore', deleteGameScoreController);

// Exporting the router for use in other parts of the application
module.exports = router;