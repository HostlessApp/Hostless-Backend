const mongoose = require('../db/connection')

const DaySchema = new mongoose.Schema({
    dayOfWeek: {
        type: String,
        required: true
    },
    openTime: {
        type: Number,
        required: true
    },
    closeTime: {
        type: Number,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    reservationSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReservationSlot'
    }]
})

module.exports = mongoose.model('Day', DaySchema )