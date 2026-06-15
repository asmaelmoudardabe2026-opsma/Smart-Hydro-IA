// ===== IMPORTS =====
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

// ===== CONFIG =====
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // يعمل على المنفذ 5000
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cors()); // مهم جداً للسماح للـ React بالاتصال بالسيرفر

// ===== GLOBAL CHECK =====
if (!API_KEY) {
  console.error("❌ OPENWEATHER_API_KEY is missing in .env");
  process.exit(1);
}

// ===== ROUTES =====

// 🏠 الصفحة الرئيسية للسيرفر
app.get("/", (req, res) => {
  res.send("🌱 Smart Hydro Secure API is running successfully 🚀");
});

// 🌤️ مسار التوصيات المحدث لاستقبال إحداثيات الخريطة (lat & lng)
app.get("/api/recommendation", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Les coordonnées lat et lng son obligatoires."
      });
    }

    // ===== استدعاء طقس الإحداثيات الحية من OPENWEATHER API =====
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=fr`;

    const response = await axios.get(url, { timeout: 5000 });
    const data = response.data;

    // ===== استخراج البيانات الحية من النتيجة =====
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherCondition = data.weather[0].description; // وصف الطقس بالفرنسية

    // ===== خوارزمية الري الذكية الخاصة بالمشروع =====
    let waterVolume = 40; // الافتراضي الاقتصادي
    let advice = "";

    if (temperature > 30 && humidity < 40) {
      waterVolume = 55;
      advice = `Alerte Température Élevée (${temperature}°C) et faible humidité (${humidity}%). Évapotranspiration intense. Augmentez le volume d'eau à 55 m³/hectare tôt le matin.`;
    } else if (humidity >= 70 || data.weather[0].main === "Rain") {
      waterVolume = 20;
      advice = `Forte humidité (${humidity}%) ou risque de pluie. Irrigation minimale de 20 m³/hectare suffisante pour économiser l'eau.`;
    } else {
      waterVolume = 40;
      advice = `Conditions optimales (${temperature}°C). Irrigation standard de 40 m³/hectare planifiée pour la fin de journée.`;
    }

    // ===== إرسال النتيجة النظيفة المطابقة لواجهة الـ React =====
    return res.json({
      weather_status: weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1),
      temperature: temperature,
      water_volume: waterVolume,
      advice: advice
    });

  } catch (error) {
    console.error("Weather API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la communication avec l'API OpenWeather.",
      error: error.message
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});