const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT * FROM incomes WHERE user_id = $1', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.post('/add', (req, res) => {
    const userId = req.user.user_id;
    const { type, title, amount, date, member } = req.body;

    pool.query('INSERT INTO incomes (user_id, type, title, amount, date, member) VALUES ($1, $2, $3, $4, $5, $6)', [userId, type, title, amount, date, member], (error, result) => {
        if(error) {
            res.status(500).send('Error adding income');
        }else {
            res.send('Added successfully')
        }
    })
})

router.put('/update/:incomeId', (req, res) => {
    const { incomeId } = req.params;
    const { type, title, amount, date } = req.body;

    console.log(incomeId)
    console.log(type, title, amount, date)

    pool.query('UPDATE incomes SET type = $1, title = $2, amount = $3, date = $4 WHERE income_id = $5', [type, title, amount, date, incomeId], (error, result) => {
        if(error) {
            res.status(500).send('Error updating income');
        }else {
            res.send('Added successfully')
        }
    })
})

router.delete('/delete/:incomeId', (req, res) => {
    const { incomeId } = req.params;

    pool.query('DELETE FROM incomes WHERE income_id = $1', [incomeId], (error, result) => {
        if(error) {
            res.status(500).send('Error deleting income');
        }else {
            res.send('Successfully deleting income')
        }
    })
})

router.get('/allfilter', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT type, SUM(amount) AS total_amount FROM incomes WHERE user_id = $1 GROUP BY type', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.get('/filter', (req, res) => {
    const { type } = req.body;

    pool.query('SELECT * FROM incomes WHERE type = $1', [type], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.get('/total', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(amount) AS total_income FROM incomes WHERE user_id = $1 GROUP BY EXTRACT(MONTH FROM date) ORDER BY month;', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error')
        }else {
            res.send(result.rows)
        }
    })
})

module.exports = router;