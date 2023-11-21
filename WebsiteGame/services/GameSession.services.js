const { query } = require("../database/db");
const moment = require("moment");

/**
 * 
 *  Retrieves all GameSession from the database.
 * @returns GameSession
 */
const getGameSession=async ()=>{
    try {
        let sql=`SELECT * FROM GameSession`
        const GameSession=await query (sql);
        return GameSession;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Retrieves a GameSession by their ID from the database
 * @returns GameSession
 */
const getGameSessionById=async (id)=>{
    try{// this is the native sql for getting a GameSession by id
        let sql=`SELECT * FROM GameSession WHERE SessionID=?`
        const GameSession=await query (sql,[id]);
        return GameSession;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} userID 
 * @param {number} gameID 
 * @param {}
 * Creates a new GameSession in the database
 * @returns result
 */
const createGameSession=async (userID,gameID)=>{
    try{// this is the native sql for inserting a GameSession
        let sql=`INSERT INTO GameSession
        (userID,gameID,starttime) 
        VALUES
        (?,?,?);
        `;
        const result =await query(sql,
            [
                userID,
                gameID,
                moment().format("YYYY-MM-DD")
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} SessionID 
 * @param {number} userID 
 * @param {number} gameID
 * Updates an existing GameSession in the database 
 * @returns result
 */
const updateGameSession=async(SessionID,userID,gameID)=>{
    try{// this is the native sql for updating a GameSession
        let sql=`UPDATE GameSession SET
        userID=?,
        gameID=?,
        starttime=?
        WHERE SessionID=?;
        `;
        const result=await query (sql,
            [
               userID,gameID,moment().format("YYYY-MM-DD"),SessionID
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Deletes a GameSession from the database by their ID
 * @returns 
 */
const deleteGameSession=async (id)=>{
    try {// this is the native sql for deleting a GameSession
        return await query(`DELETE FROM GameSession WHERE SessionID = ?`, [id]);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports={
    getGameSession,
    getGameSessionById,
    createGameSession,
    updateGameSession,
    deleteGameSession,
}
