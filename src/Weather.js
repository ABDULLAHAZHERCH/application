import React, { useState } from "react";
import "./App.css"

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/weather?city=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch.");
    }
  };

  return (
    <div className="weather-container">
      <h1 className="greeting">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="input"
        />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.wind_speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
