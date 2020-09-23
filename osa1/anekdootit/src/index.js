import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomInt = () => Math.floor(Math.random() * Math.floor(anecdotes.length))
  const selectAnecdote = () => setSelected(randomInt)

  const addVote = () => {
    const votes = [...allVotes]
    votes[selected]++
    setVotes(votes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {allVotes[selected]} votes</p>
      <Button
        handleClick={addVote}
        text='vote'
      />

      <Button
        handleClick={selectAnecdote}
        text='next anecdote'
      />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[allVotes.indexOf(Math.max(...allVotes))]}</p>
      <p>has {Math.max(...allVotes)} votes</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil',
  'Debugging is twice as hard as writing code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

