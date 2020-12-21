import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message[1]) {
    messageStyle.color = 'red'
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification