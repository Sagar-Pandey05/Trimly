const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    barberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        enum: ['haircut', 'shave', 'facial', 'massage'],
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'rescheduled'],
        default: 'pending',
    },
    note: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);