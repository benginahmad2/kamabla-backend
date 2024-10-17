const fs = require('fs');
const path = require('path');

// Function to log messages to a file
function logMessage(message) {
    const logFile = path.join(__dirname, '..', 'claim_log.txt'); // Path for the log file
    const currentDate = new Date().toISOString(); // Current date in ISO string format
    fs.appendFileSync(logFile, `[${currentDate}] ${message}\n`); // Append message to log file
}

module.exports = logMessage; // Export the logMessage function for use in other files