const info = (statement) => {
    console.log(statement)
}

const error = (error, request, response, next) => {
    console.error(error.message)
    console.info(request)
    if (error.name === 'Cast Error') {
        response.status(404)
    }
    next(error)
}
module.exports = {
    info, error
}