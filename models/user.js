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
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'reservation'
        }
    ]
})

module.exports = mongoose.model('user', UserSchema)