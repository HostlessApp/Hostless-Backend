const Restaurant = require('../models/restaurant')

const seedData = require('./restaurant-seeds.json')

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