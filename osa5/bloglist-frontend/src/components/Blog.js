import React,  { useState } from 'react'

const Blog = ({ blog, likeBlog,removeBlog  }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibilty = () => {
    setVisible(!visible)
    setLabel((label === 'view') ? 'hide' : 'view')
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibilty}>{label}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={likeBlog}>likes</button>
        <br/>
        {blog.user.name}<br/>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog