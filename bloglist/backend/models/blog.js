const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

// eslint-disable-next-line no-undef
const mongoURL = process.env.MONGODB_URI
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

module.exports = mongoose.model('Blog', blogSchema)