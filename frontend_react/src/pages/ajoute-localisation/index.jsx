// src/pages/ajoute-localisation/index.jsx
import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// assets
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';

// ==============================|| AJOUTER LOCALISATION PAGE ||============================== //

export default function AjouteLocalisation() {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !latitude || !longitude) {
      alert('Veuillez remplir tous les champs !');
      return;
    }
    console.log('Nouveau terrain ajouté:', { name, latitude, longitude });
    alert(`Le terrain "${name}" a été ajouté avec succès !`);
    // Khwīw l-inputs mn b3d l-ajout
    setName('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#1e293b' }}>
        Ajouter une Nouvelle Localisation
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Enregistrez un nouveau terrain ou un nouveau capteur connecté f l-système HydroSecure.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ bgcolor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              
              {/* 1. Nom de l'emplacement */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="new-location-name" sx={{ fontWeight: 500, color: '#475569' }}>
                    Nom du terrain / capteur
                  </InputLabel>
                  <TextField
                    id="new-location-name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Zone Est - Capteurs Pommiers"
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }}
                  />
                </Stack>
              </Grid>

              {/* 2. Latitude */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="new-latitude" sx={{ fontWeight: 500, color: '#475569' }}>
                    Coordonnées : Latitude
                  </InputLabel>
                  <TextField
                    id="new-latitude"
                    fullWidth
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Ex: 31.6295"
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }}
                  />
                </Stack>
              </Grid>

              {/* 3. Longitude */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="new-longitude" sx={{ fontWeight: 500, color: '#475569' }}>
                    Coordonnées : Longitude
                  </InputLabel>
                  <TextField
                    id="new-longitude"
                    fullWidth
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Ex: -7.9811"
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }}
                  />
                </Stack>
              </Grid>

              {/* 4. Boutons d'action */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    type="submit"
                    startIcon={<PlusCircleOutlined />}
                    sx={{ 
                      bgcolor: '#52c41a', // Lon khdr nqi dyal l-ajout dyal HydroSecure
                      '&:hover': { bgcolor: '#389e0d' },
                      textTransform: 'none',
                      borderRadius: '8px',
                      px: 3,
                      py: 1
                    }}
                  >
                    Ajouter l'emplacement
                  </Button>
                </Stack>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}