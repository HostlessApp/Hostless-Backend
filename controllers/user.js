const express = require('express')
const router = express.Router()

const User = require('../models/user')

//index

router.get('/', (req, res, next) => {
    User.find({})
        .then (user => res.json(user))
})

//Create

router.post('/', (req, res, next) => {
    const newUser = {
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        admin: req.body.admin,
        username: req.body.username
    }
    // console.log(newUser);
    console.log(req)
    User.create(newUser)
        .then(user => {
            res.json(user)
        })
        .catch(console.error)
})

//Edit

router.get('/edit/:username', (req, res, next) => {
    User.find({username: req.params.username})
        .then(user => {
            console.log(req.params._id)
            res.json(user)
        })
})

//Update

router.put('/edit/:username', (req, res, next) => {
    console.log(req.params.username)
    User.findOneAndUpdate({username: req.params.username}, {$set: {
        name: req.body.name,
        admin: req.body.admin
    }}, {new:true})
        .then(user => {
            console.log(user)
            res.send(user)})
        .catch(console.error)
})

//Delete

router.delete('/edit/:username', (req, res, next) => {
    User.findOneAndDelete({username: req.params.username})
        .then(res.redirect('/users'))
})

module.exports = router;