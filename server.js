// ===== IMPORTS =====
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

// ===== CONFIG =====
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cors()); // مهم جداً للـ React

const validateCity = require("./middleware/validateCity");

// ===== GLOBAL CHECK =====
if (!API_KEY) {
  console.error("❌ OPENWEATHER_API_KEY is missing in .env");
  process.exit(1);
}

// ===== SIMPLE CACHE =====
const cache = {};

// ===== ROUTES =====

// 🏠 Home route
app.get("/", (req, res) => {
  res.send("🌱 Smart Hydro Secure API is running successfully 🚀");
});

// 🌤️ Weather Route
app.get("/weather/:city", validateCity, async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();

    // ===== CACHE CHECK =====
    if (cache[city]) {
      return res.json({
        success: true,
        source: "cache",
        data: cache[city],
      });
    }

    // ===== OPENWEATHER API =====
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url, { timeout: 5000 });
    const data = response.data;

    // ===== EXTRACT DATA =====
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const weatherCondition = data.weather[0].main;

    // ===== DEFAULT AI LOGIC =====
    let recommendation = "";
    let waterAmount = "";

    // ===== SIMPLE IRRIGATION LOGIC =====
    if (temperature > 30 && humidity < 40 && weatherCondition !== "Rain") {
      recommendation = "Irrigation Recommended";
      waterAmount = "High";
    } else if (humidity >= 70 || weatherCondition === "Rain") {
      recommendation = "Irrigation Not Recommended";
      waterAmount = "Low";
    } else {
      recommendation = "Moderate Irrigation Recommended";
      waterAmount = "Medium";
    }

    // ===== CLEAN RESPONSE =====
    const cleanData = {
      city: data.name,
      temperature,
      humidity,
      wind_speed: windSpeed,
      wind_direction: windDirection,
      weather_condition: weatherCondition,
      recommendation,
      estimated_water_need: waterAmount,
    };

    // ===== SAVE CACHE =====
    cache[city] = cleanData;

    return res.json({
      success: true,
      source: "api",
      data: cleanData,
    });

  } catch (error) {
    console.error("Weather API Error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});