import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="None found" />
    </div>
  )
}
const MultiCountry = ({countryArray, setCountries}) => {
  return (
    <div>
        {countryArray.map((country, i) =>
            <div>
              <p>{country.name}</p> 
              <button onClick={
                () => {
                  setCountries([country])
                }
              }>show</button>
            </div>
          )}
    </div>
  )
}
const PrintData = ({countryArray, setCountries}) => {
  if(countryArray.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countryArray.length === 0) {
    return (
      <p>Nothing Found</p>
    )
  } else if (countryArray.length > 1) {
    return <MultiCountry countryArray={countryArray} setCountries={setCountries}/>
  } else {
    return <ShowCountry country={countryArray[0]}/>
  }
}
const App = () => {
  const [allCountries, setAll] = useState([])
  const [countries, setCountries] = useState([])
  const [searchBar, search] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAll(response.data)
      })
  }, [])
  const findCountry = (name) => (allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase())))

  const findCountries = (event) => {
    event.preventDefault()
    setCountries(findCountry(searchBar))
    search('')
  }
  const handleSearchBar = (event) => {
    search(event.target.value)
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