const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');

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

router.put('/', (req, res) => {
    const userId = req.user.user_id;
    const { fullname, email } = req.body;

    pool.query('UPDATE users SET full_name = $1 , email = $2 WHERE user_id = $3', [fullname, email, userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send('Profile updated successfully')
        }
    })
})


module.exports = router;