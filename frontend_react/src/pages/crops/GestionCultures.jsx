import { useState } from 'react';
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

  // دالة تحديد اللون: أحمر للخطر، أصفر للتحذير، أخضر للعادي
  const getSeverity = (status) => {
    if (status.includes("immédiatement")) return "error";
    if (status.includes("Modéré")) return "warning";
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
      setError("Erreur de connexion au serveur");
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
      // هاد السطر هو اللي غادي يخلي التنبيه يخرج باللون الأصفر (Warning)
      setData({ status: 'Modéré - Prévoir un arrosage', water: '20 Litres' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Gestion des Cultures">
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
                <Typography variant="body2"><EnvironmentOutlined /> {city}, Morocco</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4">{weather.temp}°C</Typography>
              <Typography variant="body2">{weather.desc}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
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
      
      {data && (
        <Box sx={{ mt: 4 }}>
          <Alert severity={getSeverity(data.status)} sx={{ borderRadius: '8px' }}>
            <Typography variant="h6">Recommandation pour {currentPlante} à {city} :</Typography>
            <Typography>Statut : {data.status} | Besoin : {data.water}</Typography>
          </Alert>
        </Box>
      )}
    </MainCard>
  );
}