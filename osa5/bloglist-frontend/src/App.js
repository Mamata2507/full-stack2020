import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a,b) => b.likes-a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(['wrong username or password', true])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))

    setMessage([`a new blog ${savedBlog.title} by ${savedBlog.author} added `])
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const likeBlogOf = (id) => {
    const newBlog = blogs.find(blog => blog.id === id)
    newBlog.likes++
    const likedBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: newBlog.user.id,
      likes: newBlog.likes
    }

    blogService.update(id, likedBlog)
      .then(() => {
        var copyBlogs = [...blogs]
        copyBlogs.map(blog => blog.id !== id ? blog : likedBlog)
        copyBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(copyBlogs)
      })
      .catch(() => {
        setMessage([`Blog ${newBlog.title} was already removed from server`], true)
      })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlogOf = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(id)
      var copyBlog  = [...blogs]
      copyBlog = copyBlog.filter(b => b.id !== id)
      setBlogs(copyBlog)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <div>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef} >
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs.map((blog, i) =>
        <Blog
          key={i}
          blog={blog}
          likeBlog={() => likeBlogOf(blog.id)}
          removeBlog={() => removeBlogOf(blog.id)}
        />
      )}
    </div>
  )
}

export default App