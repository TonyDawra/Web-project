const { query } = require("../database/db")
const { validationResult } = require('express-validator');

const { getGameSession, getGameSessionById, createGameSession, updateGameSession, deleteGameSession } = require("../services/GameSession.services")

/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves all GameSession from the database
 */  
const getGameSessionController = async(req, res)=>{
    try{
        res.status(200).json({GameSession: await getGameSession()});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves a GameSession by their ID from the database
 */
const getGameSessionByIdController= async(req, res)=>{
    try{
        res.status(200).json({GameSession: await getGameSessionById(req.body.SessionID)});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Creates a new GameSession in the database
 * @returns result
 */
const createGameSessionController=async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    console.log(req.body);
    const{
        userID,
        gameID,
        
    }=req.body;
    
    try{
        const result=await createGameSession(
            userID,
            gameID,

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
 * Updates an existing GameSession in the database
 */
const updateGameSessionController=async(req,res)=>{
    const {
        SessionID,
        userID,
        gameID,
        starttime
    } = req.body;
try{
    const result = await updateGameSession(
        SessionID,
        userID,
        gameID,
        starttime);
       res.status(200).json({result});
}catch(error){
    res.status(500).json({message: error?.message});
}
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Deletes a GameSession from the database by their ID.
 */
const deleteGameSessionController=async(req,res)=>{
    try{
        res.status(200).json({GameSession: await deleteGameSession(req.body.SessionID)});
    }catch{
        res.status(500).json({message: error?.message});
    }
}
module.exports={
    getGameSessionController,
    getGameSessionByIdController,
    createGameSessionController,
    updateGameSessionController,
    deleteGameSessionController,
}