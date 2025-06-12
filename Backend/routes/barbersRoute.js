const express = require('express');
const router = express.Router();
const {getAllBarbers} = require('../controllers/barberController');

router.get('/barbers', getAllBarbers);

module.exports = router;