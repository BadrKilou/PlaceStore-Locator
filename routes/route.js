const express = require('express');
const { getPlace, addPlace } = require('../controllers/places')


const router = express.Router()

router
.route('/') 
.get(getPlace)
.post(addPlace)






module.exports = router