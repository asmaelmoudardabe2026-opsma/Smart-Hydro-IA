import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // هاد السطر هو اللي زدنا باش نخزنو النصيحة
  const [recommendation, setRecommendation] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError("");
    setWeather(null);
    setRecommendation(null); 

    try {
      // 1. نجيبو الطقس
      const res = await fetch(`http://localhost:5000/weather/${city}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error("Ville non trouvée");
      setWeather(data.data);

      // 2. نجيبو النصيحة (الذكاء الاصطناعي)
      const resRec = await fetch(`http://localhost:5000/recommandation/${city}/Tomate`);
      const recData = await resRec.json();
      setRecommendation(recData);

    } catch (err) {
      setError("Impossible de charger les données. Vérifiez les serveurs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🌤️ Smart Hydro Météo</h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Entrez la ville (ex: Marrakech)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }}
          style={{ padding: "10px", width: "70%", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={getWeather}
          style={{ padding: "10px 20px", marginLeft: "10px", cursor: "pointer", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "5px" }}
        >
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Chargement en cours...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weather && (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2980b9" }}>📍 {weather.name}</h2>
          <p>🌡️ <strong>Température:</strong> {weather.main.temp}°C</p>
          <p>💧 <strong>Humidité:</strong> {weather.main.humidity}%</p>
          <p>🌬️ <strong>Vitesse du vent:</strong> {weather.wind.speed} m/s</p>
          <p>☁️ <strong>Conditions:</strong> {weather.weather[0].description}</p>
          
          <hr style={{ margin: "20px 0" }} />
          
          <h3 style={{ color: "#e67e22" }}>🧠 Recommandation d'irrigation</h3>
          {recommendation ? (
            <>
              <p style={{ fontSize: "1.1em", fontWeight: "bold" }}>Statut: {recommendation.status}</p>
              <p style={{ color: "#34495e" }}>Eau nécessaire: {recommendation.water}</p>
            </>
          ) : (
            <p>Chargement de l'IA...</p>
          )}
        </div>
      )}
    </div>
  );
}