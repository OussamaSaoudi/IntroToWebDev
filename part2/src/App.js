import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  addNote = event => {
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