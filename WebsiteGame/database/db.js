const mysql = require("mysql2/promise");
const config = require("./config");

// Variable to hold the database connection
let connection;

// Function to establish a connection to the database
const connect = async () => {
    try {
        // Creating a connection using the configuration from the 'config.js' file
        connection = await mysql.createConnection(config.db);

        // Logging successful connection details
        console.log("=================================");
        console.log(`>>>> Connection to ${process.env.DB_NAME} successful`);
        console.log("=================================");
    } catch (error) {
        // Logging an error message and exiting the process if connection fails
        console.error(`>>> Error connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
}

// Function to execute a database query
const query = async (sql, params) => {
    // Check if a connection exists, and establish a new one if not
    if (!connection) {
        await connect();
    }

    try {
        // Executing the SQL query using the established connection and parameters
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        // Logging an error message if the query fails
        console.error(`Query error -> ${sql}: ${error}`);
        throw new Error(error);
    }
}

// Exporting the 'query' function for use in other parts of the application
module.exports = {
    query,
};
