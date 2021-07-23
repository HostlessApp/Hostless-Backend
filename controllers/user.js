const express = require('express')
const router = express.Router()

const User = require('../models/user')

//index

router.get('/', (req, res, next) => {
    User.find({})
        .then (user => res.json(user))
})

//create

router.post('/', (req, res, next) => {
    const newUser = {
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        admin: req.body.admin
    }
})

module.exports = router;