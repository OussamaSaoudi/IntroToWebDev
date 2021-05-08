import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const CreateBlog = ({ user }) => {
    CreateBlog.prototypes = {
        user: PropTypes.object.isRequired
    }
    const [notifBan, setNotifBan] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handlePost = async (event) => {
        event.preventDefault()
        blogService.setToken(user)
        await blogService.postBlog(title, author, url, setNotifBan)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
            setNotifBan('')
        }, 5000)
    }
    return (
        <div>
            {notifBan !== '' && <h3>{notifBan}</h3>}
            <form onSubmit={ (event) => handlePost(event)}>
                <LoginInput setter={setTitle} state={title} name='title'/>
                <LoginInput setter={setAuthor} state={author} name='author'/>
                <LoginInput setter={setUrl} state={url} name='url'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
const LoginInput = ({ state, setter, name, hidden }) => {
    LoginInput.prototypes = {
        state: PropTypes.object.isRequired,
        setter: PropTypes.func.isRequired,
        name: PropTypes.object.isRequired,
        hidden: PropTypes.bool
    }
    const attribs = {
        value: state,
        type: hidden ? 'password' : '',
        onChange: (event) => setter(event.target.value)
    }
    return (
        <div>
            {name}:
            <input
                {...attribs}
            />
        </div>
    )
}
const Login = ({ setUser }) => {
    Login.proptypes = {
        setUser: PropTypes.func.isRequired
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            window.alert('Success!')
        } catch (error) {
            window.alert('Wrong Credentials')
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <LoginInput state={username} setter={setUsername} name={'username'}/>
                <LoginInput state={password} setter={setPassword} name={'password'} hidden={true}/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    const getAllBlogs = async () => {
        const blogs = await blogService.getAll()

        setBlogs( blogs )
    }

    const handleLike = async (blog) => {
        await blogService.putBlog(blog.id, blog.title, blog.author, blog.url, blog.likes + 1)
        getAllBlogs()
    }
    const handleRemove = async (blog) => {
        const title = blog.title
        await blogService.removeBlog(blog)
        getAllBlogs()
        window.alert(`Removed: ${title}`)
    }

    const loginForm = () => (
        <Login setUser={setUser} />
    )
    const logOut = () => {
        return (
            <form onSubmit={(event) => {
                event.preventDefault()
                window.localStorage.removeItem('loggedBlogappUser')
                setUser(null)
            }}>
                <button type="submit">
                  logout
                </button>
            </form>
        )
    }
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user)
        }
        getAllBlogs()
    }, [])

    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
        <div>
            {user === null ? loginForm() : logOut()}
            {user !== null && (
                <div>
                    <div style={hideWhenVisible}>
                        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
                    </div>
                    <div style={showWhenVisible}>
                        <h2>Create New</h2>
                        <CreateBlog user={user} />
                        <button onClick={() => setCreateBlogVisible(false)}>new blog</button>
                    </div>
                </div>
            )}
            <h2>blogs</h2>
            {blogs.sort((blog1, blog2) => blog2.likes-blog1.likes).map(blog => {
                return <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
            }
            )}
        </div>
    )
}

export default App