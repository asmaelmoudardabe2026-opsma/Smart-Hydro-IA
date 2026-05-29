import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `http://localhost:5000/weather/${city}`
      );

      if (!res.ok) {
        throw new Error("Error fetching weather");
      }

      const data = await res.json();
setWeather(data.data);
    } catch (err) {
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🌤️ Weather App</h2>

      <input
        type="text"
        placeholder="Enter city (e.g. Marrakech)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={getWeather}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

    {weather && (
  <div className="weather-card">

    <h2>📍 {weather.city}</h2>

    <p>🌡️ Temperature: {weather.temperature}°C</p>

    <p>💧 Humidity: {weather.humidity}%</p>

    <p>🌬️ Wind Speed: {weather.wind_speed} m/s</p>

    <p>☁️ Weather: {weather.weather_condition}</p>

    <hr />

    <h3>🧠 Irrigation Recommendation</h3>

    <p>{weather.recommendation}</p>

    <p>{weather.estimated_water_need}</p>

  </div>
)}
    </div>
  );
}