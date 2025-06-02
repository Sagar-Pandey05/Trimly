require('dotenv').config();
const express = require('express');
const connect = require('./config/db')
const authRoute = require('./routes/authRoutes');
const appointmentRoute = require('./routes/appointmentRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const uploadRoute = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT;
connect();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));

//Routes
app.use('/api/auth', authRoute);
app.use('/api/appointment', appointmentRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/upload", uploadRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})