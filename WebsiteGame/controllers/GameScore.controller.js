const { query } = require("../database/db")
const { validationResult } = require('express-validator');

const { getGameScore, getGameScoreById, createGameScore, updateGameScore, deleteGameScore } = require("../services/GameScore.services")

/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves all GameScore from the database
 */ 
const getGameScoreController = async(req, res)=>{
    try{
        res.status(200).json({GameScore: await getGameScore()});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Retrieves a GameScore by their ID from the database
 */
const getGameScoreByIdController= async(req, res)=>{
    try{
        res.status(200).json({GameScore: await getGameScoreById(req.body.scoreID)});
    }catch(error){
        res.status(500).json({message: error?.message});
    }
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Creates a new GameScore in the database
 * @returns result
 */
const createGameScoreController=async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    console.log(req.body);
    const{
        userID,
        score,
        
    }=req.body;
    
    try{
        const result=await createGameScore(
            userID,
            score,

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
 * Updates an existing GameScore in the database
 */
const updateGameScoreController=async(req,res)=>{
    const {
        scoreID,
        userID,
        score,
        timestamp,
    } = req.body;
try{
    const result = await updateGameScore(
        scoreID,
        userID,
        score,
        timestamp,);
       res.status(200).json({result});
}catch(error){
    res.status(500).json({message: error?.message});
}
}
/**
 * 
 * @param {status} req 
 * @param {status} res 
 * Deletes a GameScore from the database by their ID.
 */
const deleteGameScoreController=async(req,res)=>{
    try{
        res.status(200).json({GameScore: await deleteGameScore(req.body.scoreID)});
    }catch{
        res.status(500).json({message: error?.message});
    }
}
module.exports={
    getGameScoreController,
    getGameScoreByIdController,
    createGameScoreController,
    updateGameScoreController,
    deleteGameScoreController,
}