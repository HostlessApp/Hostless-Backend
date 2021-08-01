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
            {$set: {isReserved: true}} // todo - verify schema properties?
        )
    })
    .then(() => {
        res.redirect('/reservations')
    })
    .catch(next)
})

// Destroy
router.delete("/:id", (req, res, next) => {
    Reservation.findById(req.params.id)
    .then(reservation => {
        User.findByIdAndUpdate(
            {_id: req.user._id}, 
            {$pull: {reservations: reservation}}
        )
        Restaurant.findOneAndUpdate(
            {internalID: req.body.internalID},
            {$pull: {reservations: reservation}}
        )
        ReservationSlot.findByIdAndUpdate(
            {reservationSlot: req.reservationSlot._id}, // todo - slot scope
            {$set: {isReserved: false}} // todo - verify schema properties?
        )
        // return reservation
    })
    .then(() => {
        Reservation.findByIdAndRemove(req.params.id)
        .then(res.redirect('/reservations'))
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