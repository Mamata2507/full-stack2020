const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog identification is named correctly', async () => {
  const response = await api.get('/api/blogs')

  const id = response.body.map(r => r.id)
  expect(id).toBeDefined()
})

test('valid blog can be added', async () => {
  const newBlog = helper.newBlog
  await api.post('/api/blogs').send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
})

test('if likes is not set then set it to 0', async () => {
  const newBlog = helper.newBlog
  delete newBlog.likes
  
  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  response.body.forEach(r => expect(r.likes).toBeDefined())
})

test('blog without title or url will response with 400', async () => {
  const newBlog = helper.newBlog
  delete newBlog.title

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('blog can be deleted', async () => {
  let response = await api.get('/api/blogs')
  const id = response.body[0].id
  
  await api.delete(`/api/blogs/${id}`).expect(204)

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length-1)
})

afterAll(() => {
  mongoose.connection.close()
})
