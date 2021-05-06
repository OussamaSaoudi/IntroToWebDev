const info = (statement) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        console.log(statement)
    }
}

const error = (error) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        console.error(error.message)
    }
}
module.exports = {
    info, error
}