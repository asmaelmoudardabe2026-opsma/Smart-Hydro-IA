const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
// تأكدي أن المسار ديال الميدل وير صحيح بالنسبة لمكان الملف
const validateCity = require("../middleware/validateCity"); 
const cache = {};

// ===== ROUTES =====

app.get("/", (req, res) => {
  res.send("🌱 Smart Hydro Secure API is running successfully 🚀");
});

// 🔹 Weather Route
app.get("/weather/:city", validateCity, async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    if (cache[city]) {
       return res.json({ success: true, source: "cache", data: cache[city] });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url, { timeout: 5000 });
    res.json({ success: true, source: "api", data: response.data }); 
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 🔹 AI Recommendation Route (مربوط مع سيرفر أسماء 8000)
app.get("/recommandation/:city/:plante", async (req, res) => {
  const { plante } = req.params;
  console.log(`📡 Requesting AI for: ${plante}`);
  
  try {
    // الاتصال بسيرفر أسماء (FastAPI)
    const aiResponse = await axios.get(`http://127.0.0.1:8000/api/recommandation/${plante}`, { timeout: 3000 });
    
    // إرجاع النتيجة للـ Frontend بنفس التنسيق اللي كيتسناه
    res.json({
      status: aiResponse.data.resultat.recommandation, 
      water: `${aiResponse.data.resultat.besoin_eau_mm} ${aiResponse.data.resultat.unite}`
    });
  } catch (error) {
    console.error("❌ AI Server Error:", error.message);
    // في حالة كان سيرفر أسماء طافي، غنرجعو نتيجة افتراضية باش ما يتوقفش الموقع
    res.json({
      status: "Système IA non disponible", 
      water: "Connexion échouée"
    });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});