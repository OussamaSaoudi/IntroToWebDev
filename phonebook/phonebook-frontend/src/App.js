import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = '/api/persons'

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      filter shown with: <input
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
    </div>
  )
}

const NameInput = ({newName, setNewName}) => (
  <div>
    name: <input
      value={newName}
      onChange={event => {
        setNewName(event.target.value)
      }}
    />
  </div>
)

const NumberInput = ({ newNumber, setNewNumber}) => (
      <div>
        number: <input
          value={newNumber}
          onChange={event => setNewNumber(event.target.value)}
        ></input>
      </div>
)
const InputButton = ({newName, newNumber, persons, setPersons}) => {
  const addPerson = (newName, newNumber) => {
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post(baseUrl, {name: newName, number: newNumber})
        .then( response => {
          setPersons(persons.concat(response.data))
        })
        .catch(error => {
          window.alert('Name must be unique, and name must be greater than 4 chars, number more than 8 chars')
        })
        
    }
  }
  return (
    <div>
      <button type="submit" onClick={(event) => {
            event.preventDefault();
            addPerson(newName, newNumber)
          }
        }>
        add
      </button>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then( response => {
        setPersons(response.data)
      }).catch(error => console.log(error.message))
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <form>
        <NameInput newName={newName} setNewName={setNewName} />
        <NumberInput newNumber={newNumber} setNewNumber={setNewNumber}/>
        <InputButton newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} />
      </form>
      <h2>Numbers</h2>
      {
      persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
        ).map(
          (person,id) =>
            <p key={id}>
              {person.name} {person.number}
            </p>
        )
      }
    </div>
  )
}

export default App