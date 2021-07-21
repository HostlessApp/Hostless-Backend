const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant') 

//index
router.get('/', (req, res, next) => {
    Restaurant.find({})
    .then(restaurant => res.json(restaurant))
})


router.post('/', (req, res, next) => {
    const restaurant = {
        name: req.body.restaurant,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }
    }
    console.log(restaurant)
    Restaurant.create(restaurant)
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