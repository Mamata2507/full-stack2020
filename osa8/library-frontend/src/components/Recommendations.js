import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, MY_FAVORITE_GENRE } from '../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState([])

  const result = useQuery(ALL_BOOKS)
  const result2 = useQuery(MY_FAVORITE_GENRE)

  useEffect(() => {
    if (!result.loading) {
      const favGenre = result2.data.me.favoriteGenre
      const allBooks = result.data.allBooks
      setGenre(favGenre)
      setBooks(allBooks.filter(b => b.genres.includes(favGenre)))
    }
  }, [result.data]) // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        in your favorite genre <b>{genre}</b>
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
    </div>
  )
}

export default Recommendations