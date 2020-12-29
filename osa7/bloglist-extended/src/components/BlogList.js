import React from 'react'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = (props) => {
  
  const handleLike = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    props.likeBlog(likedBlog)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog)
    }
  }

  return (
    <div>
      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
          own={props.user.username === blog.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  createNotification, likeBlog, removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)