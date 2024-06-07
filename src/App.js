// src/App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import config from "./config";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const fetchWeather = async (query) => {
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=d29f227531c5ea1fb01c5ec5724772a0&units=metric`
      );
      const data = await res.json();

      console.log("API Response:", data);

      if (res.ok && data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Network error. Please try again.");
    }
  };
  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar
        onSearch={fetchWeather}
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />
      <main>
        <WeatherCard weather={weather} error={error} />
      </main>
    </div>
  );
}

export default App;
