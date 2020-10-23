import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return (
        <div>
            find countries
            <input
                value={props.filter}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

const Weather = ({ weather }) => {
    console.log(weather)
    if (weather != null) {
        return (
            <div>
                <h3>Weather in {weather.location.name}</h3>
                <div>
                    <b>temperature: </b>{weather.current.temperature} Celsius
                </div>
                <div>
                    <img src={weather.current.weather_icons[0]} />
                </div>
                <div>
                    <b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
                </div>
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}

const Country = ({country}) => {
    const [weather, setWeather] = useState()
    
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)

            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                capital {country.capital}
            </div>
                population {country.population}
            <div>
                <h3>languages</h3>
                <div>
                    <ul>
                        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <img src={country.flag} alt="flag" height="100" />
            </div>
            <Weather weather={weather} />
        </div>
    )
}

const Countries = (props) => {
    const countries = props.countries

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country => <Country key={country.name} country={country} />)}
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name}>{country.name} <button value={country.name} onClick={props.handleFilterChange}>show</button>
                    </div>)}
            </div>
        )
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const countriesToShow = filter.length === 0
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <Filter
                filter={filter} handleFilterChange={handleFilterChange}
            />
            <Countries countries={countriesToShow} handleFilterChange={handleFilterChange} />
        </div>
    )
}

export default App