const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./db/db')

const authRoute = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT;
connect();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/auth', authRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})