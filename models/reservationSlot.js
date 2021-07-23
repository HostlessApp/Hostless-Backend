const mongoose = require('../db/connection');

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
            },
            amOrPm: {
                type: String,
                required: true
            }
        },
        tables:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table'
        },
        openTables:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table'
        }
    },
    {timestamps: true}
);

const ReservationSlot = mongoose.model('ReservationSlot', reservationSlotSchema);

module.exports = ReservationSlot;

