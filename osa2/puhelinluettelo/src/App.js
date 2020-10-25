import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({ person, handleClick }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => handleClick(person.name, person.id)}>delete</button>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {

  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const names = persons.map(person => person.name.toLowerCase())

    if (names.includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data))
            setMessage([`Updated ${newName}`])

          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id))
            setMessage([`Information of ${newName} has already been removed from server`, true])
          })
      }

    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage([`Added ${newName}`])

        })
    }
    setTimeout(() => {
      setMessage(null)
    }, 3000)
    setNewName('')
    setNewNumber('')
  }

  const handleClick = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage([`Removed ${name}`])
        })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter} handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <div>
        {personsToShow.map(person =>
          <Persons key={person.id} person={person} handleClick={handleClick} />
        )}
      </div>
    </div>
  )
}

export default App