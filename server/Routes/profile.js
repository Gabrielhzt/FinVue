const express = require('express');
const router = express.Router();
const pool = require('../database');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT full_name, email FROM users WHERE user_id = $1', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows[0])
        }
    })
})

router.put('/name', (req, res) => {
    const userId = req.user.user_id;
    const { fullname } = req.body;

    pool.query('UPDATE users SET full_name = $1 WHERE user_id = $2', [fullname, userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        } else {
            res.send(result);
        }
    });
});

router.put('/email', (req, res) => {
    const userId = req.user.user_id;
    const { email } = req.body;

    pool.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        } else {
            res.send('Profile updated successfully');
        }
    });
});

router.put('/password', async (req, res) => {
    const userId = req.user.user_id;
    const { password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, userId]);
        
        res.send('Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

module.exports = router;