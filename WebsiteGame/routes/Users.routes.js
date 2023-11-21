const express = require('express');
const { getUsersController,getUserByIdController, createUsersController,deleteUserController, updateUsersController,authenticateController } = require('../controllers/Users.controller');
const { createUsersValidation,updateUsersValidation } = require('../validations/Users-validator');
const authenticateToken = require('./middleware');
const router = express.Router();// Creating an instance of Express router

// Route to get all users
router.get('/user', getUsersController);

// Route to authenticate a user
router.post('/authenticate', authenticateController);

// Route to get a user by their ID
router.post('/usersById', getUserByIdController);

// Route to create a new user with validation middleware
router.post('/user', createUsersValidation, createUsersController);

// Route to update a user with validation middleware
router.put('/user', updateUsersValidation, updateUsersController);

// Route to delete a user
router.delete('/user', deleteUserController);

// Exporting the router for use in other parts of the application
module.exports = router;