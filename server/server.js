require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const authRoutes = require('./Routes/auth');
const incomesRoutes = require('./Routes/incomes');
const passport = require('passport');

app.use(cors());
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/incomes', passport.authenticate('jwt', { session: false }), incomesRoutes);

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});