import React from "react";

const WeatherCard = ({ weather, onRemove }) => {
  const {
    name,
    main: { temp, feels_like, humidity, temp_min, temp_max },
    weather: weatherInfo,
    wind: { speed: windSpeed },
    dt,
  } = weather;

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = dateFormatter.format(new Date(dt * 1000));
  const formattedTime = timeFormatter.format(new Date(dt * 1000));

  return (
    <div className="weather-card">
      <button className="remove-btn" onClick={onRemove}>
        ×
      </button>
      <h2>{name}</h2>
      <div className="weather-main">
        <p className="temp">{Math.round(temp)}°C</p>
        <p className="description">{weatherInfo[0].description}</p>
        <p>Feels like: {Math.round(feels_like)}°C</p>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">
            {Math.round(windSpeed * 3.6)} km/h
          </span>
        </div>
        <div className="detail-item temp-min">
          <span className="detail-label">Min Temp:</span>
          <span className="detail-value">{Math.round(temp_min)}°C</span>
        </div>
        <div className="detail-item temp-max">
          <span className="detail-label">Max Temp:</span>
          <span className="detail-value">{Math.round(temp_max)}°C</span>
        </div>
      </div>
      <div className="weather-date">
        <p>Date: {formattedDate}</p>
        <p>Time: {formattedTime}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
