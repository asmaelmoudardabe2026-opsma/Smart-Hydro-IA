import { useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Alert, CircularProgress } from '@mui/material';

const crops = ['Olivier', 'Agrumes', 'Blé', 'Tomate'];

export default function CropManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommandation = async (plante) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recommandation/${plante}`);
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.log("Erreur API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #ddd' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Gestion des Cultures</Typography>
      
      <Grid container spacing={2}>
        {crops.map((c) => (
          <Grid item xs={6} md={3} key={c}>
            <Card onClick={() => fetchRecommandation(c)}>
              <CardActionArea><CardContent><Typography>{c}</Typography></CardContent></CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      
      {data && (
        <Alert sx={{ mt: 3 }}>
          Statut: {data.status} | Besoin: {data.water}
        </Alert>
      )}
    </Box>
  );
}