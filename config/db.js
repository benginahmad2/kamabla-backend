// db.js
const mysql = require('mysql2');
require('dotenv').config();
// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: "69.167.168.82",
    user: "dxbee_ktap2",
    password: "ktapktapktap2",
    database: "dxbee_ktap2",
    port: 3306
});

// Export the promise-based pool for easy usage later
module.exports = pool.promise();


