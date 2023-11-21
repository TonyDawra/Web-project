const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers,authenticate } = require("../services/Users.services")

/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Authenticates a user based on provided email and password, 
 * and returns a JWT token upon successful authentication
 */
const authenticateController = async(req, res) => {
    const {email, password} = req.body;
    if(!email){
      res.status(401).json({message: "missing data"});
    }
  
    const result = await authenticate(email, password);
    // generate token
    const token = jwt.sign({userID: result?.userID}, process.env.SECRET_KEY);
    console.log(token);
    res.status(200).json({message: "authenticated", user: result, token: token});
  }
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves all users from the database
 */  
const getUsersController = async(req, res)=>{
    try{
        res.status(200).json({Users: await getUsers()});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves a user by their ID from the database
 */
const getUserByIdController= async(req, res)=>{
    try{
        res.status(200).json({Users: await getUsersById(req.body.userID)});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Creates a new user in the database
 * @returns result
 */
const createUsersController=async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    console.log(req.body);
    const{
        username,
        name,
        email,
        password
    }=req.body;
    
    try{
        const result = await createUsers(
            username,
            name,
            email,
            password
        );
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message: error?.message})
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Updates an existing user in the database
 */
const updateUsersController=async(req,res)=>{
    const {
    userID,
    username,
    name,
    email,
    password,
    datecreated
    } = req.body;
try{
    const result = await updateUsers(
        userID,
        username,
        name,
        email,
        password,
        datecreated,);
       res.status(200).json({result});
}catch(error){
    res.status(500).json({message: error?.message});
}
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Deletes a user from the database by their ID.
 */
const deleteUserController=async(req,res)=>{
    try{
        res.status(200).json({Users: await deleteUsers(req.body.userID)});
    }catch{
        res.status(500).json({message: error?.message});
    }
}



module.exports={
    getUsersController,
    getUserByIdController,
    createUsersController,
    updateUsersController,
    deleteUserController,
    authenticateController
}
