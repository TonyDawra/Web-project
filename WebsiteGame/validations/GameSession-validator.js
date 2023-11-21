// Importing the 'check' function from the 'express-validator' library
const { check } = require('express-validator');

// Validation middleware for creating a game session
const createGameSessionValidation = [
  check('userID').notEmpty().withMessage('UserID is required'),
  check('gameID').notEmpty().withMessage('GameID is required'),
];

// Validation middleware for updating a game session
const updateGameSessionValidation = [
  check('sessionID').notEmpty().withMessage('SessionID cannot be empty'),
  check('userID').notEmpty().withMessage('UserID is required'),
  check('gameID').notEmpty().withMessage('GameID is required'),
];

// Exporting the validation middleware for use in other parts of the application
module.exports = {
  createGameSessionValidation,
  updateGameSessionValidation,
};
