const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/user/test', (req, res) => {
    res.status(200).send({
        name: "prem",
        password: "demo12345"
    })
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    console.log(req)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ status: 1, user, token })
    } catch (e) {
        res.status(400).send({status: 0, msg: 'Invalid user credentials.'})
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = router