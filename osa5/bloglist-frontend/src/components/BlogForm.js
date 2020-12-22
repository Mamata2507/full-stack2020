import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = async (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthorChange = async (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrlChange = async (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm