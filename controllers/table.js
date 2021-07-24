const express = require('express');
const router = express.Router();

const Table = require('../models/table');
const Restaurant = require('../models/restaurant'); 

//index
router.get('restaurant/:restaurant', (req, res, next) => {
    Restaurant.find({_id: req.params.restaurant})
    .then(restaurant => res.json(restaurant.tables))
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


//create
router.post('/restaurant/:restaurant', (req, res) => {
    Table.create({
        number: req.body.number,
        seats: req.body.seats
    })
})

//show
router.get('/:table/restaurant/:restaurant', (req, res, next) => {
    Restaurant.find({_id: req.params.restaurant})
    .then(restaurant => {
        const table = restaurant.tables.find({_id: req.params.table})
        res.json(table)
    })
    .catch(console.error);
})

//update
router.put('/:table', (req, res, next) => {
    Restaurant.find({_id: req.params.restaurant})
    .then(restaurant => {
        const table = restaurant.tables.find({_id: req.params.table})
        res.json(table)
    })
    .catch(console.error);
})

//destroy
router.delete('/:table', (req, res, next) => {
    Table.findOneAndDelete({_id: req.params.table})
    .then(console.log("table deleted"))
    .catch(next)
})

module.exports = router;