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
        admin: req.body.admin
    }
    console.log(newUser);
    User.create(newUser)
        .then(user => {
            res.json(user)
        })
        .catch(console.error)
})

//Edit

router.get('/edit/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
})

//Update

router.put('/edit/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(user => res.json(user))
        .catch(console.error)
})

//Delete

router.delete('/edit/:id', (req, res, next) => {
    User.findOneAndDelete({_id: req.params.id})
        .then(res.redirect('/users'))
})

module.exports = router;