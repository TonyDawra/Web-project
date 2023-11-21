const { query } = require("../database/db");

/**
 * 
 * Retrieves all Game from the database
 * @returns Game
 */
const getGame=async ()=>{
    try {// this is the native sql for getting all Game
        let sql=`SELECT * FROM Games`
        const Game=await query (sql);
        return Game;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Retrieves a Game by their ID from the database
 * @returns Game
 */
const getGameById=async (id)=>{
    try{// this is the native sql for getting a Game by id
        let sql=`SELECT * FROM Games WHERE gameID=?`
        const Game=await query (sql,[id]);
        return Game;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {String} name 
 * @param {String} description 
 * Creates a new Game in the database
 * @returns result
 */
const createGame=async (name,description)=>{
    try{// this is the native sql for inserting a Game
        let sql=`INSERT INTO Games
        (name,description) 
        VALUES
        (?,?);
        `;
        const result =await query(sql,
            [
                name,
                description
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} gameID 
 * @param {String} name 
 * @param {String} description 
 * Updates an existing Game in the database
 * @returns result
 */
const updateGame=async(gameID,name,description)=>{
    try{// this is the native sql for updating a Game
        //const user = await getUsersById(userID)
        let sql=`UPDATE Games SET
        name=?,
        description=?
        WHERE gameID=?;
        `;
        const result=await query (sql,
            [
               name,description,gameID
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Deletes a Game from the database by their ID
 * @returns query
 */
const deleteGame=async (id)=>{
    try {
        return await query(`DELETE FROM Games WHERE gameID = ?`, [id]);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports={
    getGame,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
}