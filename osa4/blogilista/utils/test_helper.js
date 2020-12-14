const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Janes Blog',
    author: 'Jane',
    url: 'www.google.fi',
    likes: 12
  },
  {
    title: 'Jons Blog',
    author: 'Jon',
    url: 'www.wikipedia.fi',
    likes: 5
  },
]

const newBlog = {
  title: 'Blog of Destiny',
  author: 'Steven',
  url: 'www.helsinki.fi',
  likes: 2
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, newBlog, blogsInDb
}