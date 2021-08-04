const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    name: {
        first: {
            type: String, 
            required: true
        },
        last: {
            type: String, 
            required: true
        }
    },
    admin: {
        type: Boolean
    },
    username: {
        type: String, 
        unique: true,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Reservation'
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)