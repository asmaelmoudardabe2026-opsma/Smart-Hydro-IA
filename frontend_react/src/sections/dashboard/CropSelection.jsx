import { useState } from 'react';
import { Box, Grid, Card, CardActionArea, CardContent, Typography, Alert } from '@mui/material';

const crops = [
  { name: 'Olivier', icon: '🫒' },
  { name: 'Agrumes', icon: '🍊' },
  { name: 'Blé', icon: '🌾' },
  { name: 'Tomate', icon: '🍅' }
];

export default function CropSelection() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectCrop = async (plante) => {
    setLoading(true);
    try {
      // Appel vers votre Backend
      const response = await fetch(`/api/recommandation/${plante}`);
      const data = await response.json();
      setRecommendation(data); 
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Choisir votre culture</Typography>
      
      <Grid container spacing={2}>
        {crops.map((crop) => (
          <Grid item xs={6} md={3} key={crop.name}>
            <Card sx={{ textAlign: 'center' }}>
              <CardActionArea onClick={() => handleSelectCrop(crop.name)}>
                <CardContent>
                  <Typography variant="h2">{crop.icon}</Typography>
                  <Typography variant="h6">{crop.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Affichage des résultats */}
      {recommendation && (
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="h6">Recommandation : {recommendation.status}</Typography>
          <Typography>Besoin en eau : {recommendation.water}</Typography>
        </Alert>
      )}
    </Box>
  );
}