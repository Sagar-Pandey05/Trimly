require('dotenv').config();
const express = require('express');
const connect = require('./config/db')
const cors = require('cors');
const authRoute = require('./routes/authRoutes');
const appointmentRoute = require('./routes/appointmentRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const uploadRoute = require('./routes/uploadRoutes');
const barberRoute = require('./routes/barbersRoute');
const app = express();
const PORT = process.env.PORT;
connect();

//Middlewares
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));

//Routes
app.use('/api/auth', authRoute);
app.use('/api/appointment', appointmentRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/upload", uploadRoute);
app.use('/api', barberRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})