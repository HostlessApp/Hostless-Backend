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
    console.log(newUser);
    User.create(newUser)
        .then(user => {
            res.json(user)
        })
        .catch(console.error)
})

//edit

router.get('/edit/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
})

router.put('/edit/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(user => res.json(user))
        .catch(console.error)
})

module.exports = router;