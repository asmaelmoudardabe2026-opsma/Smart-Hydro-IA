import { useState } from 'react';
import { Grid, Button, Typography, Box, Paper, Alert, CircularProgress } from '@mui/material';
import MainCard from 'components/MainCard';

const crops = ['Olivier', 'Agrumes', 'Blé', 'Tomate', 'Maïs'];

export default function CropSelection() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectCrop = async (crop) => {
    setLoading(true);
    setError(null);
    setSelectedCrop(crop);
    
    try {
      const response = await fetch(`/api/recommandation/${crop}`);
      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();
      setRecommendation(data);
    } catch (err) {
      setError("Erreur : Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Gestion des cultures">
      <Typography variant="body2" sx={{ mb: 3 }}>
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {crops.map((crop) => (
          <Grid item key={crop}>
            <Button
              variant={selectedCrop === crop ? "contained" : "outlined"}
              onClick={() => handleSelectCrop(crop)}
            >
              {crop}
            </Button>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress size={24} />}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {recommendation && !loading && (
        <Paper elevation={0} sx={{ p: 2, mt: 3, bgcolor: 'grey.50', border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" color="primary">Résultat : {selectedCrop}</Typography>
          <Typography variant="body1"><strong>Action :</strong> {recommendation.action}</Typography>
          <Typography variant="body1"><strong>Besoin :</strong> {recommendation.besoin} Litres</Typography>
        </Paper>
      )}
    </MainCard>
  );
}