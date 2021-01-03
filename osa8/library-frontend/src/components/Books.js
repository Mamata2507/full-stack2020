import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_GENRE } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getBooksByGenre, booksByGenre] = useLazyQuery(ALL_BOOKS_GENRE)
  const [genre, setGenre] = useState('all genres')
  const [genres, setGenres] = useState([])
  const allBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (!allBooks.loading) {
      setBooks(allBooks.data.allBooks)
      setGenres(allBooks.data.allBooks.map(b => b.genres)
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i))
    }
  }, [allBooks]) // eslint-disable-line

  useEffect(() => {
    if (booksByGenre.data) {
      setBooks(booksByGenre.data.allBooks)
    }
  }, [booksByGenre])

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const handleGenreChange = (g) => {
    getBooksByGenre({ variables: { genre: g } })
    setGenre(g)
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              book
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((g, i) =>
        <button key={i} onClick={() => {
          handleGenreChange(g)
        }}>
          {g}
        </button>
      )}
      <button onClick={() => {
        getBooksByGenre({ variables: { genre: "" } })
        setGenre('all genres')
      }}>
        all genres
      </button>
      <Comp a={1} b={2} />
    </div>
  )
}

const Comp = (props) => {
  const [x, setX] = useState(1)
  
  return (
    <div>
      <button onClick={setX(x*2)}>clic</button>
    </div>
  )
}


export default Books