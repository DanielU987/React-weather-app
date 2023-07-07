import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiCloud, WiCloudy, WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { BiSearch } from 'react-icons/bi';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  const API_KEY = 'YOUR_API_KEY';
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

  const getWeatherIcon = (weatherCode) => {
    const weatherIconMappings = {
      '01d': <WiDaySunny size={50} className="weather-icon" />,
      '01n': <WiDaySunny size={50} className="weather-icon" />,
      '02d': <WiDayCloudy size={50} className="weather-icon" />,
      '02n': <WiDayCloudy size={50} className="weather-icon" />,
      '03d': <WiCloudy size={50} className="weather-icon" />,
      '03n': <WiCloudy size={50} className="weather-icon" />,
      '04d': <WiCloudy size={50} className="weather-icon" />,
      '04n': <WiCloudy size={50} className="weather-icon" />,
      '09d': <WiRain size={50} className="weather-icon" />,
      '09n': <WiRain size={50} className="weather-icon" />,
      '10d': <WiRain size={50} className="weather-icon" />,
      '10n': <WiRain size={50} className="weather-icon" />,
      '11d': <WiThunderstorm size={50} className="weather-icon" />,
      '11n': <WiThunderstorm size={50} className="weather-icon" />,
      '13d': <WiSnow size={50} className="weather-icon" />,
      '13n': <WiSnow size={50} className="weather-icon" />,
      '50d': <WiCloud size={50} className="weather-icon" />,
      '50n': <WiCloud size={50} className="weather-icon" />,
    };

    return weatherIconMappings[weatherCode] || null;
  };

  useEffect(() => {
    if (weatherData) {
      const weatherIconType = weatherData.weather[0].icon.slice(0, 2);

      switch (weatherIconType) {
        case '01':
          document.body.style.backgroundColor = 'lightblue';
          break;
        case '02':
          document.body.style.backgroundColor = 'lightgray';
          break;
        case '03':
        case '04':
          document.body.style.backgroundColor = 'gray';
          break;
        case '09':
        case '10':
          document.body.style.backgroundColor = 'lightgreen';
          break;
        case '11':
          document.body.style.backgroundColor = 'lightgray';
          break;
        case '13':
          document.body.style.backgroundColor = 'white';
          break;
        case '50':
          document.body.style.backgroundColor = 'lightgray';
          break;
        default:
          document.body.style.backgroundColor = '';
      }
    }
  }, [weatherData]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Weather App</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={city}
                  placeholder="Enter city name"
                  onChange={handleInputChange}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  <BiSearch size={18} className="search-icon" />
                </button>
              </div>
            </form>

            {weatherData && (
              <div className="weather-data mt-4">
                <h2 className="font-weight-bold">{weatherData.name} {getWeatherIcon(weatherData.weather[0].icon)}</h2>
                
                <div className="d-flex align-items-center">
                  <span className="temperature">{weatherData.main.temp}°C</span>
                  <span className="break-point">&nbsp; - &nbsp;</span>
                  <span className="weather-description">{weatherData.weather[0].description}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Weather;
