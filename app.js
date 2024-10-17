const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const logMessage = require('./middleware/logger');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    return res.status(200).json({ test: 'test' });
})

app.post('/get-points', async (req, res) => {

    const currentDate = new Date();
    console.log('tes----', req.body.telegramId)
    const telegramId = req.body.telegramId; // Retrieve telegramId from request body

    if (!telegramId) {
        logMessage("Telegram ID is required.");
        return res.status(400).json({
            success: false,
            message: 'Telegram ID is required.'
        });
    }

    try {
        const [rows, fields] = await db.execute("SELECT balance FROM `users` WHERE id = ?", [telegramId]);
        console.log('Test row', rows);

        if (rows.length > 0) {
            const balance = rows[0].balance;
            logMessage(`User ID: ${telegramId}, Balance:${balance}`);

            if (balance > 0) {
                return res.json({
                    success: true,
                    balance: balance,
                    time: currentDate
                });
            } else {
                logMessage(`No balance available for User ID: ${telegramId}.`);
                return res.status(404).json({
                    success: false,
                    message: 'No balance available for this user.'
                });
            }
        } else {
            logMessage(`User not found:User ID: ${telegramId}.`);
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }
    } catch (error) {
        logMessage(`Database query error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Database query error.'
        });
    }

});

app.post('/reset', async (req, res) => {

    console.log('tes----', req.body.telegramId)
    const telegramId = req.body.telegramId; // Retrieve telegramId from request body
    // const reset = req.body.reset; // Check if reset is requested
    const currentDate = new Date()
    if (!telegramId) {
        logMessage("Telegram ID is required.");
        return res.status(400).json({
            success: false,
            message: 'Telegram ID is required.'
        });
    }

    try {
        await db.execute("UPDATE `users` SET balance = 0 WHERE id = ?", [telegramId]);
        logMessage(`Balance reset successfully for User ID: ${telegramId}`);
        return res.json({
            success: true,
            message: 'Balance reset successfully.',
            time: currentDate
        });
    } catch (error) {
        console.log('errrr', error)
        logMessage(`Failed to update balance for User ID: ${telegramId}. Error:{error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Failed to reset balance.'
        });
    }

});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/test', async (req, res) => {
//     console.log(req);
//     try {
//         const con = await mysql.createConnection({
//             host: "63.250.38.114",
//             user: "papbqvce_bot",
//             password: "I)Gm;IJngH_x",
//             database: "papbqvce_bot", // Added database name
//             port: 3306 // Optional: can specify port explicitly
//         });

//         con.connect(function (err) {
//             if (err) {
//                 console.error("Error connecting: " + err.stack);
//                 return res.status(500).send("Database connection failed");
//             }
//             console.log("Connected!");
//             res.send("Database connected successfully!");
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send("An error occurred");
//     }
// });
