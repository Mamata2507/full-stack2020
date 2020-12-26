import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const handleClick = async (anecdote) => {
    props.vote(anecdote)
    props.createNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      anecdotes: state.anecdotes
    }
  }
  
  return {
    anecdotes: state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  vote,
  createNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
