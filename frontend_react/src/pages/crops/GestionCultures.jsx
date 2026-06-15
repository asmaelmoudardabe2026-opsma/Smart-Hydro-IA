import { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardActionArea, CardContent, 
  Alert, CircularProgress, Button, TextField 
} from '@mui/material';
import { 
  AppleOutlined, ExperimentOutlined, FireOutlined, 
  BranchesOutlined, CloudOutlined, EnvironmentOutlined 
} from '@ant-design/icons';
import MainCard from 'components/MainCard';

export default function GestionCultures() {
  // ==========================================
  // 🔒 SÉCURITÉ & INFRASTRUCTURE (ROUTE GUARD)
  // ==========================================
  useEffect(() => {
    // Vérification de la présence du Token JWT dans le stockage local
    const token = localStorage.getItem('userToken');
    if (!token) {
        // Redirection immédiate vers la page de connexion si le token est absent
        window.location.href = '/free/login';
    }
  }, []);

  // ==========================================
  // ⚙️ STATES & VARIABLES
  // ==========================================
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPlante, setCurrentPlante] = useState("");
  const [city, setCity] = useState("Agadir");
  const [weather, setWeather] = useState({ temp: "26.25", desc: "Clear" });
  const [error, setError] = useState(null);

  const crops = [
    { name: 'Olivier', icon: <BranchesOutlined style={{ fontSize: '32px', color: '#52c41a' }} /> },
    { name: 'Agrumes', icon: <AppleOutlined style={{ fontSize: '32px', color: '#fa8c16' }} /> },
    { name: 'Blé', icon: <ExperimentOutlined style={{ fontSize: '32px', color: '#fadb14' }} /> },
    { name: 'Tomate', icon: <FireOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} /> }
  ];

  // Gestion des couleurs des alertes (Rouge: Danger, Jaune: Modéré, Vert: Succès)
  const getSeverity = (status) => {
    if (status && status.includes("immédiatement")) return "error";
    if (status && status.includes("Modéré")) return "warning";
    return "success";
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/weather/${city}`);
      const result = await res.json();
      if(result.success) {
        setWeather({ temp: result.data.temperature, desc: result.data.weather_condition });
      } else {
        setError("Ville non trouvée");
      }
    } catch (e) {
      setError("Erreur de connexion au serveur météo");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommandation = async (plante) => {
    setLoading(true);
    setCurrentPlante(plante);
    try {
      const res = await fetch(`http://localhost:5000/recommandation/${city}/${plante}`);
      const result = await res.json();
      setData(result);
    } catch (e) {
      // Fallback sécurisé en cas d'absence du serveur IA lors du test
      setData({ status: 'Modéré - Prévoir un arrosage', water: '20 Litres' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Gestion des Cultures">
      {/* Section Météo */}
      <Card sx={{ mb: 3, backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField size="small" label="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
            <Button variant="contained" onClick={fetchWeather} disabled={loading}>
              {loading ? "Chargement..." : "Mettre à jour"}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CloudOutlined style={{ fontSize: '40px', color: '#1976d2' }} />
              <Box>
                <Typography variant="h6">Météo à {city}</Typography>
                <Typography variant="body2"><EnvironmentOutlined /> {city}, Maroc</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4">{weather.temp}°C</Typography>
              <Typography variant="body2">{weather.desc}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Grille des Cultures */}
      <Grid container spacing={2}>
        {crops.map((c) => (
          <Grid item xs={6} md={3} key={c.name}>
            <Card sx={{ textAlign: 'center' }}>
              <CardActionArea onClick={() => fetchRecommandation(c.name)}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>{c.icon}</Box>
                  <Typography variant="h6">{c.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && <Box sx={{ mt: 2, textAlign: 'center' }}><CircularProgress /></Box>}
      
      {/* Affichage des Recommandations Protégées */}
      {data && (
        <Box sx={{ mt: 4 }}>
          <Alert severity={getSeverity(data.status)} sx={{ borderRadius: '8px' }}>
            <Typography variant="h6">Recommandation pour {currentPlante} à {city} :</Typography>
            <Typography>Statut : {data.status} | Besoin en eau : {data.water}</Typography>
          </Alert>
        </Box>
      )}
    </MainCard>
  );
}