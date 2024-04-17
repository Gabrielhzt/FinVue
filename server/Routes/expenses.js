const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT * FROM expenses WHERE user_id = $1', [userId], (error, result) => {
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

    console.log(userId)

    pool.query('INSERT INTO expenses (user_id, type, title, amount, date, member) VALUES ($1, $2, $3, $4, $5, $6)', [userId, type, title, amount, date, member], (error, result) => {
        if(error) {
            res.status(500).send('Error adding expense');
        }else {
            res.send('Added successfully')
        }
    })
})

router.put('/update/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const { type, title, amount, date } = req.body;

    console.log(expenseId)
    console.log(type, title, amount, date)

    pool.query('UPDATE expenses SET type = $1, title = $2, amount = $3, date = $4 WHERE expense_id = $5', [type, title, amount, date, expenseId], (error, result) => {
        if(error) {
            res.status(500).send('Error updating expense');
        }else {
            res.send('Updated successfully')
        }
    })
})

router.delete('/delete/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    pool.query('DELETE FROM expenses WHERE expense_id = $1', [expenseId], (error, result) => {
        if(error) {
            res.status(500).send('Error deleting expense');
        }else {
            res.send('Successfully deleting expense')
        }
    })
})

router.get('/allfilter', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT type, SUM(amount) AS total_amount FROM expenses WHERE user_id = $1 GROUP BY type', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.get('/filter', (req, res) => {
    const { type } = req.body;

    pool.query('SELECT * FROM expense WHERE type = $1', [type], (error, result) => {
        if(error) {
            res.status(500).send('Error');
        }else {
            res.send(result.rows)
        }
    })
})

router.get('/total', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT EXTRACT(MONTH FROM date) AS month, SUM(amount) AS total_expense FROM expenses WHERE user_id = $1 GROUP BY EXTRACT(MONTH FROM date) ORDER BY month;', [userId], (error, result) => {
        if(error) {
            res.status(500).send('Error')
        }else {
            res.send(result.rows)
        }
    })
})

module.exports = router;