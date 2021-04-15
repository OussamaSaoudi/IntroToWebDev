import React, { useEffect, useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [notes,setNotes] = useState([])

  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5
    }
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(respones => {
      console.log(response)
    })
  }

  
  return (
    <div>
      <form onSubmit={findCountries}>
        <input
          value={searchBar}
          onChange={handleSearchBar}
          />
        <button type="submit">search</button>
      </form>
      <PrintData countryArray={countries} setCountries={setCountries}/>
    </div>

  )
}

export default App 