const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant') 

//index
router.get('/', (req, res, next) => {
    Restaurant.find({})
    .then(restaurant => res.json(restaurant))
})


router.post('/', (req, res, next) => {
    Restaurant.Create(req.body)
        .then(restaurant => {
            res.json(restaurant)
        })
        .catch(console.error)
})


//new


//create

//show

//edit

//update

//destroy

module.exports = router;