const express = require('express');
const { bookAppointment, updateAppointment, rescheduleAppointment, getAllAppointments, getUserAppointments, cancelAppointment } = require('../controllers/appointmentController');
const Router = express.Router();
const { protect, authorize } = require('../middleware/auth');

//book appointment 
Router.post('/book', protect, authorize('user'), bookAppointment);

//update appointment status
Router.put('/status/:id', protect, authorize('barber', 'admin'), updateAppointment);

//reschedule appointment
Router.put('/reschedule/:id', protect, authorize('user','barber'), rescheduleAppointment);

Router.get("/all", protect, authorize("admin", "barber"), getAllAppointments);

Router.get("/my", protect, authorize("user"), getUserAppointments);

Router.delete("/cancel/:id", protect, authorize("user"), cancelAppointment);

module.exports = Router;