
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {name: 1, username: 1})

    response.json(blogs)
})

blogsRouter.get('/:id', (request, response) => {
    const id = request.params.id
    Blog
        .findById(id)
        .populate('user', {name: 1, username: 1})
        .then(blog => {
            logger.info('returned is: ', blog)
            if (blog !== null) {
                response.json(blog)
            } else {
                response.status(400).json({error: 'id not found'})
            }
        })
})

blogsRouter.put('/:id', (request, response) => {
    const id = request.params.id
    logger.info(request.body)
    const newBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? Number(request.body.likes) : 0
    }

    Blog
        .findByIdAndUpdate(id, newBlog, {new: true})
        .then( updatedBlog => response.json(updatedBlog.toJSON()))
        .catch(error => logger.error(error))
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.author || !body.title) {
        response.status(400).json({error: 'author and title must be set'})
        return
    }
    
    const user = await User.findById(body.userId)
    logger.info(user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        logger.info(user)
        response.json(user.toJSON())
    } catch (error) {
        logger.error(error)
        response.status(400).json({error: 'user, author, and title must be provided'})
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    try {
        logger.info('id: ',id)
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch (error) {
        logger.error(error)
        response.status(400).json({error: 'could not find the id'})
    }
    
})
module.exports = blogsRouter