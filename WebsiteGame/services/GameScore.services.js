const { query } = require("../database/db");
const moment = require("moment");

/**
 * 
 * Retrieves all GameScore from the database
 * @returns GameScore
 */
const getGameScore=async ()=>{
    try {// this is the native sql for getting all GameScore
        let sql=`SELECT * FROM GameScore`
        const GameScore=await query (sql);
        return GameScore;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Retrieves a GameScore by their ID from the database
 * @returns GameScore
 */
const getGameScoreById=async (id)=>{
    try{// this is the native sql for getting a GameScore by id
        let sql=`SELECT * FROM GameScore WHERE scoreID=?`
        const GameScore=await query (sql,[id]);
        return GameScore;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} userID 
 * @param {number} score 
 * Creates a new GameScore in the database
 * @returns result
 */
const createGameScore=async (userID,score)=>{
    //const user = await getUsersById(userID)
    try{// this is the native sql for inserting a GameScore
        let sql=`INSERT INTO GameScore
        (userID,score,timestamp) 
        VALUES
        (?,?,?);
        `;
        const result =await query(sql,
            [
                userID,
                score,
                moment().format("YYYY-MM-DD")

            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} scoreID 
 * @param {number} userID 
 * @param {number} score 
 * @param {String} timestamp 
 * Updates an existing GameScore in the database
 * @returns result
 */
const updateGameScore=async(scoreID,userID,score)=>{
    try{// this is the native sql for updating a GameScore
        //const score =` ${points} `;
        let sql=`UPDATE GameScore SET
        userID=?,
        score=?,
        timestamp=?
        WHERE scoreID=?;
        `;
        const result=await query (sql,
            [
               userID,score,moment().format("YYYY-MM-DD"),scoreID
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Deletes a GameScore from the database by their ID
 * @returns 
 */
const deleteGameScore=async (id)=>{
    try {// this is the native sql for deleting a GameScore
        return await query(`DELETE FROM GameScore WHERE scoreID = ?`, [id]);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports={
    getGameScore,
    getGameScoreById,
    createGameScore,
    updateGameScore,
    deleteGameScore,
}