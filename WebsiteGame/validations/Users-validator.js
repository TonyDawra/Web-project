const { check } = require('express-validator');// Importing the 'check' function from the 'express-validator' library

// Validation middleware for creating users
const createUsersValidation = [
  check('username').notEmpty().withMessage('Username is required'),
  check('name').notEmpty().withMessage('name  is required'),
  check('email').isEmail().withMessage('Invalid Email Format'),
  check('password').notEmpty().withMessage('User Password is required'),
  check('password').isStrongPassword().withMessage("You entered a weak pwd"),
];

// Validation middleware for updating users
const updateUsersValidation = [
  check('userID').notEmpty().withMessage('User id cannot be empty'),
  check('username').notEmpty().withMessage('Username is required'),
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('Invalid Email Format'),
  check('password').notEmpty().withMessage('User Password is required'),
  check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),// Custom password validation using a regular expression
];

// Exporting the validation middleware for use in other parts of the application
module.exports = {
  createUsersValidation,
  updateUsersValidation,
};
