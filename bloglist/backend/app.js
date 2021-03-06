const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const morganStyle = 'tiny'
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connectiong to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        logger.info('connected to MongoDB')
    }).catch(error => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(morgan(morganStyle))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app