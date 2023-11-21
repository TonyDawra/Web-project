const { query } = require("../database/db");
const moment = require("moment");

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * Authenticates a user based on provided email and password 
 * @returns user[0]
 */
const authenticate = async (email, password) => {
    try {
        let sql = `SELECT * FROM Users WHERE email = ?
    AND password = ?`
        const user = await query(sql, [email, password]);
        return user[0];
    } catch (error) {
        throw new Error(error);
    }
}
/**
 * 
 * Retrieves all users from the database
 * @returns Users
 */
const getUsers=async ()=>{
    try {// this is the native sql for getting all user
        let sql=`SELECT * FROM Users`
        const Users=await query (sql);
        return Users;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Retrieves a user by their ID from the database
 * @returns Users
 */
const getUsersById=async (id)=>{
    try{// this is the native sql for getting a user by id
        let sql=`SELECT * FROM Users WHERE userID=?`
        const Users=await query (sql,[id]);
        return Users;
    }catch (error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {String} username 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * Creates a new user in the database
 * @returns result
 */
const createUsers=async (username,name,email,password)=>{
    try{// this is the native sql for inserting a user
        let sql=`INSERT INTO Users
        (username,name,email,password, datecreated) 
        VALUES
        (?,?,?,?,?);
        `;
        const result =await query(sql,
            [
                username,
                name,
                email,
                password,
                moment().format("YYYY-MM-DD")
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} userID 
 * @param {String} username 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * Updates an existing user in the database
 * @returns result
 */
const updateUsers=async(userID,username,name,email,password)=>{
    try{// this is the native sql for updating a user
        let sql=`UPDATE Users SET
        username=?,
        name=?,
        email=?,
        password=?,
        datecreated=?
        WHERE userID=?;
        `;
        const result=await query (sql,
            [
                username,name,email,password,moment().format("YYYY-MM-DD"), userID
            ]);
            return result;
    }catch(error){
        throw new Error(error);
    }
}
/**
 * 
 * @param {number} id 
 * Deletes a user from the database by their ID
 * @returns query
 */
const deleteUsers=async (id)=>{
    try {// this is the native sql for deleting a user
        return await query(`DELETE FROM Users WHERE userID = ?`, [id]);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports={
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    authenticate,
}
