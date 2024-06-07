// src/components/WeatherCard.js
import React from "react";

const WeatherCard = ({ weather, error }) => {
  if (error) {
    return <div className="weather-card error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-card loading">Loading...</div>;
  }

  const {
    name,
    main: { temp, feels_like, humidity },
    weather: weatherInfo,
    wind: { speed: windSpeed },
    dt,
    sys: { sunrise, sunset },
  } = weather;

  // Validation checks
  if (
    !name ||
    !temp ||
    !weatherInfo ||
    !windSpeed ||
    !dt ||
    !sunrise ||
    !sunset
  ) {
    console.error("Invalid or missing weather data:", weather);
    return <div className="weather-card error">Invalid weather data</div>;
  }

  // Format date and time
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
  const formattedSunrise = timeFormatter.format(new Date(sunrise * 1000));
  const formattedSunset = timeFormatter.format(new Date(sunset * 1000));

  return (
    <div className="weather-card">
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
        <div className="detail-item">
          <span className="detail-label">Sunrise:</span>
          <span className="detail-value">{formattedSunrise}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sunset:</span>
          <span className="detail-value">{formattedSunset}</span>
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
