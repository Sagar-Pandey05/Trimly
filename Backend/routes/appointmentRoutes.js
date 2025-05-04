const express = require('express');
const { bookAppointment, updateAppointment, rescheduleAppointment } = require('../controllers/appointmentController');
const Router = express.Router();
const { protect, authorize } = require('../middleware/auth');

//book appointment 
Router.post('/book', protect, authorize('user'), bookAppointment);

//update appointment status
Router.put('/status/:id', protect, authorize('barber', 'admin'), updateAppointment);

//reschedule appointment
Router.put('/reschedule/:id', protect, authorize('user','barber'), rescheduleAppointment);

module.exports = Router;