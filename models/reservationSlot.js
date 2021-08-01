const mongoose = require('../db/connection')

const reservationSlotSchema = new mongoose.Schema(
    {
        time: {
            hour: {
                type: Number,
                required: true,
            },
            minute: {
                type: Number,
                required: true,
            }
        },
        tables: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table'
        }],
        openTables: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table'
        }], 
        isReserved: {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('ReservationSlot', reservationSlotSchema)