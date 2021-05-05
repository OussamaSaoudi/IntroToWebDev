require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
app.use(blogsRouter)

app.use(cors())
app.use(express.json())

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})