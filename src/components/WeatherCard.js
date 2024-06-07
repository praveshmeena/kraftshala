// src/components/WeatherCard.js
import React from "react";

const WeatherCard = ({ weather, error }) => {
  if (error) {
    return <div className="weather-card error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-card loading">Loading...</div>;
  }

  const { name, main, weather: weatherInfo, dt } = weather;

  // More detailed checks
  if (!name || typeof name !== "string") {
    console.error("Invalid or missing city name:", name);
    return <div className="weather-card error">Invalid city data</div>;
  }

  if (!main || typeof main.temp !== "number") {
    console.error("Invalid or missing temperature data:", main);
    return <div className="weather-card error">Invalid temperature data</div>;
  }

  if (
    !Array.isArray(weatherInfo) ||
    weatherInfo.length === 0 ||
    typeof weatherInfo[0].description !== "string"
  ) {
    console.error("Invalid or missing weather description:", weatherInfo);
    return (
      <div className="weather-card error">Invalid weather description</div>
    );
  }

  if (typeof dt !== "number") {
    console.error("Invalid or missing date/time:", dt);
    return <div className="weather-card error">Invalid date/time data</div>;
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

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>Temperature: {Math.round(main.temp)}°C</p>
      <p>Description: {weatherInfo[0].description}</p>
      <p>Date: {formattedDate}</p>
      <p>Time: {formattedTime}</p>
    </div>
  );
};

export default WeatherCard;
