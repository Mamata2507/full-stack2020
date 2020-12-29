import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'

import loginService from './services/login'
import storage from './utils/storage'

import { createNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const user = await loginService.login({
        username, password,
      })
      props.login(username, password)
      storage.saveUser(user)
      props.createNotification(`${user.name} welcome back!`, 'success', 5)
    } catch (exception) {
      props.createNotification(`wrong username/password!`, 'error', 5)
    }
  }

  const handleLogout = async () => {
    props.logout()
    storage.logoutUser()
  }

  if (!props.user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              name='username'
            />
          </div>
          <div>
            password
            <input
              name='password'
              type='password'
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {props.user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef} >
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { createNotification, login, logout }
)(App)