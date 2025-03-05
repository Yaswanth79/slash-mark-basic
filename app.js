import React, { useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeather(null);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    }
  }, []);
  
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Unable to fetch weather data.");
    }
  };
  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <Search fetchWeather={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weather && <Weather weather={weather} />}
    </div>
  );
};

export default App;