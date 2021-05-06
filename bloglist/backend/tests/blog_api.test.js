const { afterAll, test, expect, describe } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('../utils/list_helpr')
beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('PUT', () => {
    test('put works', async () => {
        
    })
})

describe('DELETE', () => {
    test('deletion works', async () => {
        const id = helper.initialBlogs[0]._id
        await api
            .delete(`/api/blogs/${id}`)
        await api
            .get(`/api/blogs/${id}`)
            .expect(400)
    })
})

describe('GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('number of blogs is correct', async () =>  {
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)

    })
    
    test('id is correct', async () => {
        const response = await api
            .get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('POST', () => {
    test('post creates new blog post', async () =>{
        const newBlog = {
            title: 'My first blog',
            author: 'Me',
            url: 'oussamasaoudi.com',
            likes: 3
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
        
        const blogs = response.body.map(blog => {
            let newBlog = {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
            }
            return newBlog
        })
        expect(blogs).toContainEqual(newBlog)
    })

    test('no title gives 400', async () => {
        const newBlog = {
            author: 'Me',
            url: 'oussamasaoudi.com',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('no author gives 400', async () => {
        const newBlog = {
            title: 'My first blog',
            url: 'oussamasaoudi.com',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Correctness', () => {
    test('no likes defaults to 0', async () => {
        const newBlog = {
            title: 'My first blog',
            author: 'Me',
            url: 'oussamasaoudi.com',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)

        const response = await api
            .get('/api/blogs')
        
        const returnedBlog = response.body.filter(blog => blog.title === 'My first blog')
        expect(returnedBlog[0].likes).toBe(0)
    })
})

describe('User', () => {
    test('Name must be min 3 length', async () => {
        const newUser = {
            username: 'a',
            name: 'Oussama',
            password: 'testPass'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    test('Name must be min 3 length', async () => {
        const newUser = {
            username: 'Oussama',
            name: 'a',
            password: 'testPass'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .end()
    })
})

afterAll(() => {
    mongoose.connection.close()
})