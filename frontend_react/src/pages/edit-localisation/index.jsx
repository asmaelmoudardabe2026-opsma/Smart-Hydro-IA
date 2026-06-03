// src/pages/edit-localisation/index.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

// Icon d Enregistrer kī l-photo
import SaveOutlined from '@ant-design/icons/SaveOutlined';

export default function EditLocalisation() {
  const [capteur, setCapteur] = useState('Capteur Zone Nord (Marrakech)');
  const [emplacement, setEmplacement] = useState('Zone Nord - Irrigation');
  const [latitude, setLatitude] = useState('31.6295');
  const [longitude, setLongitude] = useState('-7.9811');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Modifications enregistrées avec succès !');
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* l-Titre lmsal kī l-photo */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1e293b' }}>
        Edit Localisation
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ bgcolor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: '#334155' }}>
              Modifier la Localisation de Terrain
            </Typography>

            <Grid container spacing={3} alignItems="flex-end">
              
              {/* Sélectionner le Terrain / Capteur */}
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="select-capteur" sx={{ fontWeight: 500, fontSize: '13px', color: '#475569' }}>
                    Sélectionner le Terrain / Capteur
                  </InputLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      id="select-capteur"
                      value={capteur}
                      onChange={(e) => setCapteur(e.target.value)}
                      sx={{ bgcolor: '#f8fafc', borderRadius: '4px' }}
                    >
                      <MenuItem value="Capteur Zone Nord (Marrakech)">Capteur Zone Nord (Marrakech)</MenuItem>
                      <MenuItem value="Capteur Zone Sud">Capteur Zone Sud</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>

              {/* Nom de l'emplacement */}
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="nom-emp" sx={{ fontWeight: 500, fontSize: '13px', color: '#475569' }}>
                    Nom de l'emplacement
                  </InputLabel>
                  <TextField
                    id="nom-emp"
                    fullWidth
                    size="small"
                    value={emplacement}
                    onChange={(e) => setEmplacement(e.target.value)}
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '4px' } }}
                  />
                </Stack>
              </Grid>

              {/* Coordonnées: Latitude */}
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lat" sx={{ fontWeight: 500, fontSize: '13px', color: '#475569' }}>
                    Coordonnées : Latitude
                  </InputLabel>
                  <TextField
                    id="lat"
                    fullWidth
                    size="small"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '4px' } }}
                  />
                </Stack>
              </Grid>

              {/* Coordonnées: Longitude */}
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lng" sx={{ fontWeight: 500, fontSize: '13px', color: '#475569' }}>
                    Coordonnées : Longitude
                  </InputLabel>
                  <TextField
                    id="lng"
                    fullWidth
                    size="small"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '4px' } }}
                  />
                </Stack>
              </Grid>

              {/* Les Boutons l-te7t kī l-photo exact */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SaveOutlined />}
                    sx={{
                      bgcolor: '#1677ff',
                      '&:hover': { bgcolor: '#0958d9' },
                      textTransform: 'none',
                      borderRadius: '4px',
                      px: 3,
                      fontWeight: 500
                    }}
                  >
                    Enregistrer les modifications
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      borderRadius: '4px',
                      px: 3,
                      color: '#64748b',
                      borderColor: '#cbd5e1'
                    }}
                  >
                    Annuler
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