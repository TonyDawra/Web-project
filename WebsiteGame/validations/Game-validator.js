// Importing the 'check' function from the 'express-validator' library
const { check } = require('express-validator');

// Validation middleware for creating a game
const createGameValidation = [
  check('name').notEmpty().withMessage('Name is required'),
];

// Validation middleware for updating a game
const updateGameValidation = [
  check('gameID').notEmpty().withMessage('GameID cannot be empty'),
  check('name').notEmpty().withMessage('Name is required'),
];

// Exporting the validation middleware for use in other parts of the application
module.exports = {
  createGameValidation,
  updateGameValidation,
};
