const mongoose = require('../db/connection')

const ReservationSchema = new mongoose.Schema({
    day: {type: String, required: true},
    time: {
        hour: {
            type: Number,
            required: true,
        },
        minute: {
            type: Number,
            required: true,
        },
        amOrPm: {
            type: String,
            required: true
        }
    },
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