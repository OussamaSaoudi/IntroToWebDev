import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PrintData = ({countryArray}) => {
  if(countryArray.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countryArray.length === 0) {
    return (
      <p>Nothing Found</p>
    )
  } else if (countryArray.length > 1) {
    return (
      <ul>
        {countryArray.map(country =>
          <p>{country.name}</p>
          )}
      </ul>
    )
  } else {
    let country = countryArray[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="None found" />
      </div>
    )
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
      <PrintData countryArray={countries}/>
    </div>

  )
}

export default App 