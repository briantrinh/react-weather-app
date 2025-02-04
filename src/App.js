import React, { useState, useEffect } from 'react'
import WeatherCodeTable from './WeatherCode.js'
//import logo from './logo.svg';
import './App.css';

function App() {
  const [zipCode, setZipCode] = useState("")
  const [zip, setZip] = useState(null)

  const handleChange = ({target}) => setZipCode(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    setZip(zipCode)
  };

  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null)

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'accept-encoding': 'deflate, gzip, br'}
  };

  const apikey = "bI038WXUmkPN20prbxcAnrObUac6RqKm" // cannot securely store this in a client. need a backend server https://stackoverflow.com/questions/48699820/how-do-i-hide-an-api-key-in-create-react-app

  useEffect( () => {
    if (zip !== null) {
      fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${zipCode}%US&apikey=${apikey}`, options)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          //setTemperature(res.data.values.temperature * 9 / 5 + 32)
          setTemperature(res.data.values.temperature)
          setWeatherCode(WeatherCodeTable[res.data.values.weatherCode])
          setLocation(res.location.name)
        })
        .catch(err => console.error(err));
    }
  }, [zip]);

  return (
    <div class="grid-container">

      <title> US Weather App </title>

      <div class="title-container">
        <h1> US Weather App </h1>
      </div>

      <div class="form-container">
        <form onSubmit = {handleSubmit}>
          <input type="text" placeholder="Enter US Zip Code" value={zipCode} onChange={handleChange} class="input-container"></input>
          <button type="submit" class="button-container"> Submit </button>
        </form>
      </div>

      <div class="location-container">
        {location && <h3> {location} </h3>}
      </div>

      <div class="data-container">
        {temperature && <h3> {temperature + "°C / " + Math.round( (temperature * 9 / 5 + 32) * 10)/10 + "°F"} </h3>}
        {weatherCode && <h3> {weatherCode} </h3>}
        {weatherCode && <h3> Include Picture </h3>}
      </div>
    </div>
  );
}

export default App;