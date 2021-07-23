const Restaurant = require('../models/restaurant')
const Table = require('../models/table')
const ReservationSlot = require('../models/reservationSlot')
const User = require('../models/user')

const seedData = require('./restaurant-seeds.json')
const tableSeedData = require('./table-seeds.json')
const reservationSlotSeedData = require('./reservationSlot-seeds.json')
const userSeedData = require('./user-seeds.json')


console.log(ReservationSlot);
ReservationSlot.deleteMany({})
.then(() => {
    // console.log("seeding Reservation Slots")
})
.then(() => {
    return ReservationSlot.insertMany(reservationSlotSeedData)
})
//.then(console.log)
.catch((err) => {
    console.log(err)
})
.finally(() => {
    process.exit()
})

Table.deleteMany({})
    .then(() => {
        // console.log("seeding Tables")
        return Table.insertMany(tableSeedData)
    })
    .then(() => {
        console.log("about to look for table ids")
        Table.find({},{"_id":1})
        .then(tableIDs => {
            console.log("tableIDs")
            Restaurant.deleteMany({})
            .then(() => {
                let newRestaurants = seedData.map(restaurant => {
                    return({...restaurant, tables: [tableIDs]})
                })
                console.log("newRestaurants")
            return Restaurant.insertMany(newRestaurants)
            })
        })
        // .then(console.log)
        // .catch((err) => {
        //     console.log(err)
        // })
        // .finally(() => {
        //     process.exit()
        // })
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
