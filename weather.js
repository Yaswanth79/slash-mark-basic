import React from "react";

const Weather = ({ weather }) => {
  const { list, city } = weather;

  return (
    <div className="weather">
      <h2>Weather Forecast for {city.name}</h2>
      <div className="forecast">
        {list.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-item">
            <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p>Temperature: {item.main.temp}°C</p>
            <p>Weather: {item.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;