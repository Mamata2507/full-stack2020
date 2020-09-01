import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  return(
    <div>
      <Header course = {course} />
      <Content content = {part1} exercise = {exercise1} />
      <Content content = {part2} exercise = {exercise2} />
      <Content content = {part3} exercise = {exercise3} />
      <Total exercises = {exercise1+exercise2+exercise3} />

    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.content} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises}</p> 
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))