const logger = require('./logger')
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error)
    if (error.name === 'Cast Error') {
        response.status(404)
    }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}