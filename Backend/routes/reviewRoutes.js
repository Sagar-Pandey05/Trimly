const express = require('express');
const Router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {addReview, getBarberReviews, getAverageRating} = require('../controllers/reviewController');

Router.post('/add', protect, authorize('user'), addReview);
Router.get('/:barberId', protect, authorize('user'), getBarberReviews);
Router.get("/average/:barberId", getAverageRating);


module.exports = Router;

