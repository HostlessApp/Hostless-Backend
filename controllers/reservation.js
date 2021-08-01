const express =  require('express')
const router = express.Router()

const Reservation = require('../models/reservation')
const ReservationSlot = require('../models/reservationSlot')
const Restaurant = require('../models/restaurant')
const User = require('../models/user')

// Index
router.get('/', (req, res, next) => {
    Reservation.find({})
    .populate('restaurant')
    .populate('reservationSlot')
    .populate('user')
    .populate('table')
    .then(reservation => res.json(reservation))
    .catch(next)
})

// Index - Admin View
router.get('/admin/:internalID', (req, res, next) => {
    Restaurant.findOne({internalID: req.params.internalID})
    .populate('reservations')
    .then(restaurant => res.json(restaurant))
})

// Create
router.post("/", (req, res, next) => { // todo - resID may be necessary?
    Reservation.create({
        day: req.body.day,
        numberGuests: req.body.numberGuests,
        restaurant: req.restaurant._id,
        reservationSlot: req.reservationSlot._id,
        user: req.user._id,
        table: req.table._id
    })
    .then(reservation => {
        User.findOneAndUpdate(
            {username: req.body.username}, 
            {$push: {reservations: reservation}}
        )
        Restaurant.findOneAndUpdate(
            {internalID: req.body.internalID},
            {$push: {reservations: reservation}}
        )
        return reservation
    })
    .then(() => {
        ReservationSlot.findByIdAndUpdate(
            {reservationSlot: req.reservationSlot._id}, // todo - slot scope
            {$set: {isReserved: true}} // todo - verify schema properties
        )
    })
    .then(() => {
        res.redirect('/reservations')
    })
    .catch(next)
})

// Update
/* router.get("/edit/:id", (req, res, next) => {
    Reservation.findById(req.params.id)
    .populate('user')
    .populate('table')
    .then(reservation => {
        console.log('reservation-edit: ', reservation)
        res.json(reservation)
    })
    .catch(next)
})
router.put('/edit/:id', (req, res, next) => { 
    console.log('reservation-update: ', req.params.id)
    Reservation.findOneAndUpdate(
        {_id: req.params.id},
        {
            day: req.body.day,
            time: req.body.time,
            numberGuests: req.body.numberGuests,
            user: req.user._id,
            table: req.table._id
        },
        {new: true}
    )
    .then(reservation => {
        console.log('updated-reservation: ', reservation)
        res.send(reservation)
        // res.redirect('/reservations')
    })
    .catch(next)
}) */

// Destroy
router.delete("/:id", (req, res, next) => {
    Reservation.findByIdAndRemove(req.params.id)
    // .then(res.redirect('/reservations'))
    .catch(next)
})

module.exports = router