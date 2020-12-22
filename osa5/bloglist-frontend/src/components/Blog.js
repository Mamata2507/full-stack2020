import React,  { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog  }) => {
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
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button id="show-blog" onClick={toggleVisibilty}>{label}</button>
        <div style={showWhenVisible} className="togglableContent">
          {blog.url}<br/>
        likes {blog.likes} <button id="like" onClick={likeBlog}>like</button>
          <br/>
          {blog.user.name}<br/>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog