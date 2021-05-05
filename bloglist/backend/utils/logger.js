const info = (statement) => {
    console.log(statement)
}

const error = (error) => {
    console.error(error.message)
}
module.exports = {
    info, error
}