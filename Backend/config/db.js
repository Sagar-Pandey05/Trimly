const mongoose = require('mongoose');

function connect() {
    mongoose.connect(process.env.MONGO_URI).
    then(() => {
        console.log('Successfully Connected to Database...');
    }).catch((err) => {
        console.log("Error connecting to database", err.message);
    });
}

module.exports = connect;