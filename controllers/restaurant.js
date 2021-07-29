const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant') 

//index
router.get('/', (req, res, next) => {
    Restaurant.find({})
    .then(restaurant => res.json(restaurant))
})

router.get('/:id', (req, res, next) => {
    Restaurant.find({internalID: req.params.id })
    .then(restaurant => res.json(restaurant))
})


router.post('/', (req, res, next) => {
    Restaurant.find({}, {"_id": 1})
        .then(count => {
            const restaurant = {
                name: req.body.restaurant,
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                },
                internalID: count.length+1}
                console.log(restaurant)
                Restaurant.create(restaurant)
                    .then(restaurant => {
                        res.json(restaurant)
                    })
                    .catch(console.error)
        })
})


//new


//create

//show

//edit

//update

//destroy


///////Day Model////////

//index
router.get('/:id/:day', (req, res, next) => {
    Restaurant.findOne({internalID: req.params.id })
    .populate('daysOpen')
    .then(restaurant =>console.log(restaurant))
})

module.exports = router;