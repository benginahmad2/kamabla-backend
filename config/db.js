// db.js
const mysql = require('mysql2');
require('dotenv').config();
// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

// Export the promise-based pool for easy usage later
module.exports = pool.promise();


