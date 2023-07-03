import React, { useState } from 'react';
import axios from 'axios';
import { TiWeatherCloudy } from 'react-icons/ti';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = 'f472c86b382800cac8314e1a08fddbd0';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(API_URL + city)
      .then((response) => {
        setWeatherData(response.data);
        setCity('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <div>
            <TiWeatherCloudy size={50} />
            <span>{weatherData.main.temp}°C</span>
          </div>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
