const mongoose = require('../db/connection')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    address: {
        street: {
            type: String, 
            required: true
        },
        street2: {
            type: String, 
        },
        city: {
            type: String, 
            required: true
        },
        state: {
            type: String, 
            required: true
        },
        zip: {
            type: String, 
            required: true
        },
    },
    daysOpen: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
    tables:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'table'
        }
    ],
    reservations:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reservation'
        }
    ],
    internalID: {
        type: String, 
        required: true
    }

})

module.exports = mongoose.model('Restaurant', RestaurantSchema )