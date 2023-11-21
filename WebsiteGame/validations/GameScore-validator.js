// Importing the 'check' function from the 'express-validator' library
const { check } = require('express-validator');

// Validation middleware for creating a game score
const createGameScoreValidation = [
  check('userID').notEmpty().withMessage('UserID is required'),
  check('score').notEmpty().withMessage('Score is required'),
];

// Validation middleware for updating a game score
const updateGameScoreValidation = [
  check('scoreID').notEmpty().withMessage('ScoreID cannot be empty'),
  check('userID').notEmpty().withMessage('UserID is required'),
  check('score').notEmpty().withMessage('Score is required'),
];

// Exporting the validation middleware for use in other parts of the application
module.exports = {
  createGameScoreValidation,
  updateGameScoreValidation,
};
