const mongoose = require('../db/connection')

const ReservationSchema = new mongoose.Schema({
    date: {type: String, required: true},
    numberGuests: {type: Number, required: true},
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