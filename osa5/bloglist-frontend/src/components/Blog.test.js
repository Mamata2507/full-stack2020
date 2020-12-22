import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  id: '5fd8f2846010181aa924f996',
  name: 'Jane Johnson',
  username: 'jame'
}

const blog = {
  id: '5fda7aab563442c20aab73eb',
  title: 'Testing Blog',
  likes: 2,
  author: 'John Tester',
  url: 'www.tesblog.com',
  user: user
}

test('at start the togglable content is not displayed', () => {
  const component = render(
    <Blog blog ={blog} />
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')
})

test('after clicking view button, togglable content is displayed', () => {
  const component = render(
    <Blog blog ={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})


test('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog ={blog} likeBlog={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})