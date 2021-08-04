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
    .populate({
        path: 'reservations',
        populate: {path: 'reservationSlot'},
    })
    .populate({
        path: 'reservations',
        populate: {path: 'user'}
    })
    .then(restaurant => res.json(restaurant))
})

// Create
router.post("/", (req, res, next) => { // todo - resID may be necessary?
    console.log('reqest log')
    console.log('req - looking for user::',req.body)
    User.findOne({username: req.body.user})
    .then(user => {
        Reservation.create({
            day: req.body.date,
            restaurant: req.body.restaurant,
            reservationSlot: req.body.time,
            user: user
            // user: req.user._id
        })
        .then(reservation => {
            User.findOneAndUpdate(
                {username: req.body.user}, 
                {$push: {reservations: reservation}}
            )
            .catch(console.error)
            Restaurant.findOneAndUpdate(
                {_id: req.body.restaurant},
                {$push: {reservations: reservation}}
            )
            .catch(console.error)

        })
        .then(() => {
            ReservationSlot.findOneAndUpdate(
                {_id: req.body.time}, // todo - slot scope
                {$set: {isReserved: true}} // todo - verify schema properties?
            )
            .catch(console.error)
        })
        
        .then(() => {
            res.redirect('/reservations')
        })
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
})

// Destroy
router.delete("/:id", (req, res, next) => {
    Reservation.findByIdAndRemove(req.params.id)
    // .then(res.redirect('/reservations'))
    .catch(next)
})

module.exports = router