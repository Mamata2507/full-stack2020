import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'


const NewBlog = (props) => {
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    try {
      props.createBlog(blog)
      props.createNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      props.createNotification('failed to add blog', 'error', 5)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input name='title' />
        </div>
        <div>
          author:
          <input name='author' />
        </div>
        <div>
          url:
          <input name='url' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createBlog, createNotification }
)(NewBlog)