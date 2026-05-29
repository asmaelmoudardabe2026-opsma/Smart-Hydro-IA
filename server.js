// ===== IMPORTS =====
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// ===== CONFIG =====
dotenv.config();

const app = express();
// 🔹 المنفذ الخاص بكِ هو 5000 كما حددتِ
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ===== MIDDLEWARE =====
const validateCity = require("./middleware/validateCity");

// ===== GLOBAL CHECK =====
if (!API_KEY) {
  console.error("❌ API key is missing in .env");
  process.exit(1);
}

// ===== BASIC MIDDLEWARE =====
app.use(express.json());

// ===== SIMPLE CACHE =====
const cache = {};

// ===== ROUTES =====

// 🔹 Home route
app.get("/", (req, res) => {
  res.send("🌱 Smart Hydro Secure API is running successfully 🚀");
});

// 🔹 Weather Route (Connected with Asma's FastAPI Server)
app.get("/weather/:city", validateCity, async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();

    // ===== CHECK CACHE =====
    if (cache[city]) {
      return res.json({
        success: true,
        source: "cache",
        data: cache[city]
      });
    }

    // ===== API URL (OpenWeather) =====
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // ===== API CALL TO OPENWEATHER =====
    const response = await axios.get(url, {
      timeout: 5000
    });

    const data = response.data;

    // ===== WEATHER DATA =====
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const weatherCondition = data.weather[0].main;

    // ===== 🤖 CALL ASMA'S FASTAPI SERVER (Port 8000) =====
    let recommendation = "";
    let waterAmount = "";
    
    try {
      // 🛠️ التوصيل المباشر بسيرفر أسماء لطلب حسابات الزيتون (olivier)
      const asmaApiUrl = `http://127.0.0.1:8000/api/recommandation/olivier`;
      
      const asmaResponse = await axios.get(asmaApiUrl, { timeout: 3000 });
      const aiData = asmaResponse.data;

      // دمج التوصيات القادمة من نموذج ذكاء أسماء الاصطناعي بنجاح
      recommendation = `Plante: ${aiData.resultat.plante} | ${aiData.resultat.recommandation}`;
      waterAmount = `💧 Besoin en eau: ${aiData.resultat.besoin_eau_mm} ${aiData.resultat.unite}`;

    } catch (aiError) {
      console.warn("⚠️ Failed to connect to Asma's FastAPI server, using JS Fallback logic.");
      // منطق احتياطي (Fallback) في حال كان سيرفر بايثون مغلقاً أو واجه مشكلة
      if (temperature > 30 && humidity < 40 && weatherCondition !== "Rain") {
        recommendation = "✅ Irrigation Recommended (Fallback)";
        waterAmount = "💧 Estimated Water Need: High";
      } else if (humidity >= 70 || weatherCondition === "Rain") {
        recommendation = "❌ Irrigation Not Recommended (Fallback)";
        waterAmount = "💧 Estimated Water Need: Low";
      } else {
        recommendation = "⚠️ Moderate Irrigation Recommended (Fallback)";
        waterAmount = "💧 Estimated Water Need: Medium";
      }
    }

    // ===== CLEAN DATA FOR FRONTEND =====
    const cleanData = {
      city: data.name,
      temperature: temperature,
      humidity: humidity,
      wind_speed: windSpeed,
      wind_direction: windDirection,
      weather_condition: weatherCondition,
      recommendation: recommendation,        // القيمة القادمة من ذكاء أسماء أو الـ Fallback
      estimated_water_need: waterAmount      // القيمة القادمة من ذكاء أسماء أو الـ Fallback
    };

    // ===== SAVE CACHE =====
    cache[city] = cleanData;

    // ===== RESPONSE =====
    res.json({
      success: true,
      source: "api",
      data: cleanData
    });

  } catch (error) {
    // ===== API ERROR =====
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message
      });
    }

    // ===== SERVER ERROR =====
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});