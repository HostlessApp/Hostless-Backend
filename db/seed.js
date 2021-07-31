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

let IDs = [];

// console.log(ReservationSlot);
// ReservationSlot.deleteMany({})
//seedData.forEach(item => console.log(item))

Table.deleteMany({})
.then(() => {
    console.log('deleted tables')
    //clear out old data
    ReservationSlot.deleteMany({})
    .then(()=>{
        console.log('deleted reservation slots')
        
        Restaurant.deleteMany({})
        .then(()=>{
            console.log('deleted restaurants')
            User.deleteMany({})
            .then(()=> {
                console.log('deleted users')
                Day.deleteMany({})
                .then(()=>{
                    console.log('deleted days')
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
                                let data = daySeedData.map(d => {
                                    ReservationSlot.insertMany(reservationSlotSeedData)
                                    .then(res => {
                                        return({...d, reservationSlots: res})
                                    })
                                    .then("day: " + console.log)
                                    .catch(console.error)
                                })
                                // console.log("day:" + data)
                                let outer = () => {return new Promise( (suc, err) => {
                                    suc(daySeedData.forEach(day => {
                                        ReservationSlot.insertMany(reservationSlotSeedData)
                                        .then(reservations => {
                                            // console.log(day)
                                            // console.log(reservations)
                                            return Day.create({...day, reservationSlots: reservations})
                                            .then(newDay => {
                                                // console.log(newDay);
                                                return newRestaurant.daysOpen.push(newDay._id)
                                                // daysToAdd.push(newDay)
                                                console.log(newRestaurant.daysOpen)
                                            })
                                            .catch(console.error)
                                        })
                                            .catch(console.error)
                                        })
                                        )
                                    })
                                }
                                .then (()=> newRestaurant.save())
                                
                            .then(newRestaurant => console.log("newRes: " + newRestaurant))
                            .catch(console.error)
                        })
                        .catch(console.error)
                    })
                })
                .then(() => {
                    User.insertMany(userSeedData)
                    .then(console.log)
                    .catch(console.error)
                })
                .catch(console.error)
            })
            .catch(console.error)
        })
    })
    .catch(console.error)
})
.finally(() => {
    setTimeout( () => {
        console.log("exiting process")
        process.exit()
    }, 10000)
})