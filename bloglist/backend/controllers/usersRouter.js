const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {author: 1, title: 1, url: 1, id: 1})
    response.json(users)
})
usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        logger.error(error)
        response.status(400).json({error: 'name and username must have a minimum length of 3 characters'})
    }

})

module.exports = usersRouter