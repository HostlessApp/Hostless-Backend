const Restaurant = require('../models/restaurant')
const Table = require('../models/table')
const ReservationSlot = require('../models/reservationSlot')
const User = require('../models/user')

const seedData = require('./restaurant-seeds.json')
const tableSeedData = require('./table-seeds.json')
const reservationSlotSeedData = require('./reservationSlot-seeds.json')
const userSeedData = require('./user-seeds.json')

// let tableIDs = [];
// console.log(ReservationSlot);
// ReservationSlot.deleteMany({})

Table.deleteMany({})
    .then(() => {
        // console.log("seeding Tables")
        return Table.insertMany(tableSeedData)
    })
    .then(() => {
        console.log("about to look for table ids")
        Table.find({},{"_id":1})
        .then(foundTableIDs => {
            console.log(foundTableIDs)
            IDs = foundTableIDs;
            console.log(IDs.map(item => item._id))

            Restaurant.deleteMany({})
                .then(() => {
                    let newRestaurants = seedData.map(restaurant => {
                        return({...restaurant, tables: IDs.map(item => item._id)})
                    })
                    console.log(newRestaurants)
                    return Restaurant.insertMany(newRestaurants)
                })
                .then(console.log)
                .then(() => {
                    User.deleteMany({})
                        .then(() => {
                            return User.insertMany(userSeedData)
                        })
                        .then(console.log)
                        .catch((err) => {
                            console.log(err)
                        })
                        .finally(() => {process.exit()})
                })
                .catch((err) => {
                    console.log(err)
                })

            ReservationSlot.deleteMany({})
            .then(() => {
                return ReservationSlot.insertMany(reservationSlotSeedData);
            })
            .then(slots => console.log(slots))

        })
        .catch(console.error)
    })
    .catch(console.error)

    // .finally(() => {
    //     process.exit()
    // })