const { query } = require("../database/db")
const { validationResult } = require('express-validator');

const { getGame, getGameById, createGame, updateGame, deleteGame } = require("../services/Game.services")

/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves all Game from the database
 */ 
const getGameController = async(req, res)=>{
    try{
        res.status(200).json({Game: await getGame()});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves a Game by their ID from the database
 */
const getGameByIdController= async(req, res)=>{
    try{
        res.status(200).json({Game: await getGameById(req.body.gameID)});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Creates a new Game in the database
 * @returns result
 */
const createGameController=async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    console.log(req.body);
    const{
        name,
        description
        
    }=req.body;
    
    try{
        const result=await createGame(
            name,
            description
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
 * Updates an existing Game in the database
 */
const updateGameController=async(req,res)=>{
    const {
        gameID,
        name,
        description
    } = req.body;
try{
    const result = await updateGame(
        gameID,
        name,
        description);
       res.status(200).json({result});
}catch(error){
    res.status(500).json({message: error?.message});
}
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Deletes a Game from the database by their ID.
 */
const deleteGameController=async(req,res)=>{
    try{
        res.status(200).json({Game: await deleteGame(req.body.gameID)});
    }catch{
        res.status(500).json({message: error?.message});
    }
}
module.exports={
    getGameController,
    getGameByIdController,
    createGameController,
    updateGameController,
    deleteGameController,
}