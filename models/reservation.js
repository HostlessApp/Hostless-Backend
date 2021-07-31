const mongoose = require('../db/connection')

const ReservationSchema = new mongoose.Schema({
    day: {type: String, required: true},
    numberGuests: {type: Number},
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    reservationSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReservationSlot'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    }
}, {timestamps: true})

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation