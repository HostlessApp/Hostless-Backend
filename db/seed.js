const Restaurant = require('../models/restaurant')
const Table = require('../models/table')
const ReservationSlot = require('../models/reservationSlot')
const User = require('../models/user')
const Day = require('../models/day')

const seedData = require('./restaurant-seeds.json')
const tableSeedData = require('./table-seeds.json')
const reservationSlotSeedData = require('./reservationSlot-seeds.json')
const userSeedData = require('./user-seeds.json')
const daySeedData = require('./day-seeds.json')
const day = require('../models/day')

let IDs = [];
// console.log(ReservationSlot);
// ReservationSlot.deleteMany({})
//seedData.forEach(item => console.log(item))

Table.deleteMany({})
.then(() => {
    //clear out old data
    ReservationSlot.deleteMany({})
    .then(()=>{
        Restaurant.deleteMany({})
        .then(()=>{
            User.deleteMany({})
            .then(()=> {
                Day.deleteMany({})
                .catch(console.error)
            })
            .catch(console.error)
        })
        .catch(console.error)
    })
    .catch(console.error)
})
.then(() => {
    User.insertMany(userSeedData)
    .then(console.log)
    .catch(console.error)
})
.then(() => {
    // seed nested Restaurant -> (Tables, Days -> ReservationSlots) data
    //loop through each of the restaurante
    seedData.forEach(restaurant => {
        //create tables for each restaurant by seeding the table data each time
        Table.insertMany(tableSeedData)
        .then(tables => {
            //pass the created table and add them to the new restaurant object as it is created.
            Restaurant.create({...restaurant, tables: tables.map(table => table.id), daysOpen: []})
            .then(newRestaurant => {
                daySeedData.forEach(day => {
                    ReservationSlot.insertMany(reservationSlotSeedData)
                    .then(reservations => {
                        // console.log(day)
                        // console.log(reservations)
                        Day.create({...day, reservationSlots: reservations})
                        .then(newDay => {
                            newRestaurant.daysOpen.push(newDay)
                        })
                        .catch(console.error)
                    })
                    .catch(console.error)
                    
                })

            })
            .catch(console.error)
        })
        .catch(console.error)
    })
})
.catch(console.error)
//.finally(() => {
//     User.insertMany(userSeedData)
//     .then(console.log)
//     .catch(console.error)
// })

    // console.log("seeding Tables")
    // Table.insertMany(tableSeedData)
    
    // .then(() => {
    //     console.log("about to look for table ids")
    //     Table.find({},{"_id":1})
    //     .then(foundTableIDs => {
    //         console.log(foundTableIDs)
    //         IDs = foundTableIDs;
    //         console.log(IDs.map(item => item._id))

    //         Restaurant.deleteMany({})
    //             .then(() => {
    //                 let newRestaurants = seedData.map(restaurant => {
    //                     return({...restaurant, tables: IDs.map(item => item._id)})
    //                 })
    //                 console.log(newRestaurants)
    //                 return Restaurant.insertMany(newRestaurants)
    //             })
    //             .then(console.log)
    //             .then(() => {
    //                 User.deleteMany({})
    //                     .then(() => {
    //                         return User.insertMany(userSeedData)
    //                     })
    //                     .then(console.log)
    //                     .catch((err) => {
    //                         console.log(err)
    //                     })
    //                     .finally(() => {process.exit()})
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })

    //         ReservationSlot.deleteMany({})
    //         .then(() => {
    //             return ReservationSlot.insertMany(reservationSlotSeedData);
    //         })
    //         .then(slots => console.log(slots))

    //     })
    //     .catch(console.error)

    // })
    // .catch(console.error)