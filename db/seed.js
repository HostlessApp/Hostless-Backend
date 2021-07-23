const Restaurant = require('../models/restaurant')
const Table = require('../models/table')
const ReservationSlot = require('../models/reservationSlot')
const User = require('../models/user')

const seedData = require('./restaurant-seeds.json')
const tableSeedData = require('./table-seeds.json')
const reservationSlotSeedData = require('./reservationSlot-seeds.json')
const userSeedData = require('./user-seeds.json')

Restaurant.deleteMany({})
    .then(() => {
        return Restaurant.insertMany(seedData)
    })
    .then(console.log)
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        process.exit()
    })

Table.deleteMany({})
    .then(() => {
    return Table.insertMany(tableSeedData)
    })
    .then(console.log)
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        process.exit()
    })

User.deleteMany({})
    .then(() => {
        return User.insertMany(userSeedData)
    })
    .then(console.log)
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        process.exit()
    })
