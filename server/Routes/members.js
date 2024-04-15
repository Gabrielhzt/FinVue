const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT * FROM members WHERE user_id = $1', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.post('/add', (req, res) => {
    const userId = req.user.user_id;
    const { full_name, amount } = req.body;

    pool.query('INSERT INTO members (user_id, full_name, amount) VALUES ($1, $2, $3)', [userId, full_name, amount], (error, result) => {
        if(error) {
            res.status(500).send('Error adding member');
        }else {
            res.send('Added successfully')
        }
    })
})

router.put('/update/:memberId', (req, res) => {
    const { memberId } = req.params;
    const { full_name, amount } = req.body;

    console.log(memberId)

    pool.query('UPDATE members SET full_name = $1, amount = $2 WHERE member_id = $3', [full_name, amount, memberId], (error, result) => {
        if(error) {
            res.status(500).send('Error updating member');
        }else {
            res.send('Added successfully')
        }
    })
})

router.delete('/delete/:memberId', (req, res) => {
    const { memberId } = req.params;

    pool.query('DELETE FROM members WHERE member_id = $1', [memberId], (error, result) => {
        if(error) {
            res.status(500).send('Error deleting member');
        }else {
            res.send('Successfully deleting member')
        }
    })
})

router.get('/total', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(income_amount) AS total_income, SUM(expense_amount) AS total_expense, SUM(income_amount) - SUM(expense_amount) AS net_total FROM (SELECT date, amount AS income_amount, 0 AS expense_amount FROM incomes WHERE user_id = $1 UNION ALL SELECT date, 0 AS income_amount, amount AS expense_amount FROM expenses WHERE user_id = $1) AS combined_data GROUP BY EXTRACT(MONTH FROM date) ORDER BY month;', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error')
        }else {
            res.send(result.rows)
        }
    })
})

module.exports = router;