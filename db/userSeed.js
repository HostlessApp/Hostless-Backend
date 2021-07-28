const User = require('../models/user')

const userSeedData = require('./user-seeds.json')

User.deleteMany({})
    .then(() => {
        console.log('hit')
        return User.insertMany(userSeedData)
    })
    .then(console.log)
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        process.exit()
    })