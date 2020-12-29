import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      const id = action.data.id
      const changedBlog = state.find(a => a.id === id)
      changedBlog.likes += 1
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'REMOVE_BLOG':
      const removeId = action.data.id
      return state.filter(b => b.id !== removeId)
    case 'INIT_BLOGS':
      return action.data
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  blogService.update(blog)
  return async dispatch => {
    dispatch({
      type: 'ADD_LIKE',
      data: blog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export default reducer