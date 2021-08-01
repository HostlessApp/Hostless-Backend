const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant') 
const Day = require('../models/day');
const Table = require('../models/table')
const { create } = require('../models/restaurant');
const ReservationSlot = require('../models/reservationSlot')

const reservationSlotSeedData = require('../db/reservationSlot-seeds.json')

//index
router.get('/', (req, res, next) => {
    Restaurant.find({})
    .then(restaurant => res.json(restaurant))
})

//Edit Route
router.get('/edit/:internalID', (req, res, next) => {
    console.log(req.params.internalID)
    Restaurant.findOne({internalID: {$eq: req.params.internalID}})
        .then(restaurant => {
            res.json(restaurant)
        })
})

//Update Restaurant
router.put('/edit/:internalID', (req, res, next) => {
    console.log(req.params.internalID)
    Restaurant.findOneAndUpdate({internalID: req.params.internalID}, {$set: {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description
    }}, {new:true})
        .then(restaurant => {
            console.log(restaurant)
            res.send(restaurant)})
        .catch(console.error)
})


router.get('/:id', (req, res, next) => {
    Restaurant.find({internalID: req.params.id })
    .populate('daysOpen')
    .then(restaurant => res.json(restaurant))
})

//create restaurant and append internalID
router.post('/', (req, res, next) => {
    Restaurant.find({}, {"_id": 1})
    .then(count => {
    async function createTables() {
        let tables = req.body.tables
        let data = []
        for (let i = 0; i < tables.length; i++) {
            const table = {
                number: tables[i].tableNumber,
                seats: tables[i].size
            }
            data.push(table)
        }
        console.log(data)
        return data
    }

    async function createTable(table) {
        console.log(table)
        return Table.create(table)
    }

    async function createTableModels(tables) {
        console.log('err')
        let tableData = []
        for (const table of tables) {
            const data = await createTable(table);
            console.log(data, "MEWKNFDASCOMASDM")
            tableData.push(data._id)
        }
        console.log(tableData)
        return tableData
    }

    async function createHours() {
        let hours = req.body.hours
        let daysOfWeek = [];
        Object.keys(hours).forEach(day => {
            const newDay = {
                dayOfWeek: day,
                openTime: 1,
                // openTime: hours[day].open
                // closeTime: hours[day].close
                closeTime: 2,
                isOpen: hours[day].isOpen
                
            }
            daysOfWeek.push(newDay)
            console.log(daysOfWeek)
        });
        return daysOfWeek
    }
    async function createDay(day) {
        return Day.create(day)
    }
    async function createDayModels(days) {
        let daysOfWeek = []
        for (const day of days) {
            const data = await createDay(day);
            daysOfWeek.push(data._id)
        }
        return daysOfWeek
    }

    createHours().then(hours => {
        createDayModels(hours).then(days => {
            let newDays = days;
            createTables().then(tables => {
                createTableModels(tables).then(tableData => {
                    let newTables = tableData;
                    const restaurant = {
                        name: req.body.about.restaurant,
                        description: req.body.about.description,
                        address: {
                            street: req.body.about.street,
                            city: req.body.about.city,
                            state: req.body.about.state,
                            zip: req.body.about.zip
                        },
                        daysOpen: newDays,
                        tables: newTables,
                        internalID: count.length+1
                    }
                    console.log(restaurant)
                    Restaurant.create(restaurant)
                        .then(restaurant => {
                            console.log(restaurant)
                            res.json(restaurant)
                        })
                        .catch(console.error)
                })
            })
        })
    })
    })

})

//new


//create

//show

//edit

//update

//destroy
router.delete('/:id', (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(res.redirect('/restaurants'))

})

///////Day Model////////

//index
// router.get('/:id/:day', (req, res, next) => {
//     Restaurant.findOne({internalID: req.params.id })
//     .populate('daysOpen')
//     .then(restaurant =>console.log(restaurant))
// })

//view day
router.get('/day/:dayID', (req, res) => {
    Day.findById(req.params.dayID)
    .populate('ReservationSlot')
    .then(day => {
        res.json(day.reservationSlots)
    })
    .catch((error)=>{
        console.log(error)
        res.send("uh oh, something went wrong")
    })
})

// create day
router.post('/day/create', (req, res) => {
    ReservationSlot.insertMany(reservationSlotSeedData)
    .then(slots => {
        Day.create({
            dayOfWeek: req.body.dayOfWeek,
            openTime: req.body.open,
            closeTime: req.body.close,
            reservationSlots: slots
        })
        .then(day => {
            Restaurant.find({internalID: req.body.restaurant})
            .then(restaurant => {
                restaurant.daysOpen.push(day)
                restaurant.save();
            })
            .catch(console.error)
        })
        .catch(console.error)
    })
    .catch(console.error)
})

module.exports = router;