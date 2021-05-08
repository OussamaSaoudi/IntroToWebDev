import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const CreateBlog = ({user, title, setTitle, author, setAuthor, url, setUrl, notifBan, setNotifBan}) => {

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
const LoginInput = ({state, setter, name, hidden}) => {
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
const Login = ({username, setUsername, password, setPassword, setUser}) => {

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notifBan, setNotifBan] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user)
    }
  }, [])

  const loginForm = () => (
    <Login
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    setUser={setUser}
    title={title}
    setTitle={setTitle}
  />
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
  return (
    <div>
      {user === null
      ? loginForm()
      :logOut()}

      {user !== null && (
        <div>
          <h2>Create New</h2>
          <CreateBlog 
            user={user}
            title={title} 
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            notifBan={notifBan}
            setNotifBan={setNotifBan}
          />
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App