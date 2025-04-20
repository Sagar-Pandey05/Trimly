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
        enum: ["user", "barber", "admin"],
        default: "user"
    },
    profilePic: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);