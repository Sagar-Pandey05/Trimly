const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 11,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6 
    },
    role: {
        type: String,
        enum: ['client', 'barber']
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;