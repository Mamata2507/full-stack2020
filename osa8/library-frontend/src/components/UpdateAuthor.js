import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [setBornTo, setSetBorn] = useState(authors[0].born)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo } })
    setName('')
    setSetBorn('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <select value={name} onChange={handleChange}>
            {authors.map(a => 
              <option key={a.name}> {a.name} </option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor