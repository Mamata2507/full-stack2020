import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
const Header = ({ name }) => (<h2>{name}</h2>)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, e) => sum + e.exercises, 0)
  return (
    <b>Total of {total} exercises</b>
  )
}
const Part = ({ name, exercises }) => (<p>{name} {exercises}</p>)

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

export default Course