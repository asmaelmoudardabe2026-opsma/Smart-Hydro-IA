import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

// project imports
import MainCard from 'components/MainCard';

export default function DashboardDefault() {
  // Déclarations des états locaux sécurisés
  const [lat, setLat] = React.useState('31.6295');
  const [lng, setLng] = React.useState('-7.9811');
  const [source, setSource] = React.useState('Emplacement de la ferme (Par défaut)');
  const [farmName, setFarmName] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

  React.useEffect(() => {
    const handleMapMessage = (event) => {
      if (event.data && event.data.source === 'leaflet-map') {
        setLat(Number(event.data.lat).toFixed(6));
        setLng(Number(event.data.lng).toFixed(6));
        setSource(event.data.type === 'click' ? 'Position sélectionnée par clic' : 'Position ajustée par marqueur');
        setSuccessMsg(''); // Efface le message précédent lors d'un nouveau clic
      }
    };

    window.addEventListener('message', handleMapMessage);
    return () => window.removeEventListener('message', handleMapMessage);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!farmName.trim()) {
      alert("Veuillez saisir un nom pour la parcelle avant d'enregistrer.");
      return;
    }
    setSuccessMsg(`Succès ! La parcelle "${farmName}" a été enregistrée aux coordonnées [${lat}, ${lng}].`);
  };

  const iframeSourceCode = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        html, body, #map-container { margin: 0; padding: 0; height: 100%; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map-container"></div>
      <script>
        var map = L.map('map-container').setView([31.6295, -7.9811], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        
        var marker = L.marker([31.6295, -7.9811], { draggable: true }).addTo(map);
        
        function sendCoords(lat, lng, type) {
          window.parent.postMessage({ source: 'leaflet-map', lat: lat, lng: lng, type: type }, '*');
        }
        
        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          sendCoords(e.latlng.lat, e.latlng.lng, 'click');
        });
        
        marker.on('dragend', function() {
          var position = marker.getLatLng();
          sendCoords(position.lat, position.lng, 'drag');
        });
      </script>
    </body>
    </html>
  `;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Configuration & Modification de la Localisation
        </Typography>
      </Grid>

      {successMsg && (
        <Grid item xs={12}>
          <Alert severity="success" variant="filled" sx={{ borderRadius: '8px' }}>
            {successMsg}
          </Alert>
        </Grid>
      )}

      <Grid item xs={12}>
        <MainCard title="Interface d'Édition de Localisation - Région de Marrakech">
          <Grid container spacing={3}>
            {/* Carte */}
            <Grid item xs={12} md={7}>
              <iframe
                title="Interactive Map Selection"
                srcDoc={iframeSourceCode}
                style={{ 
                  width: '100%', 
                  height: '450px', 
                  borderRadius: '12px', 
                  border: '1px solid #e0e0e0'
                }}
              />
            </Grid>

            {/* Formulaire de traitement */}
            <Grid item xs={12} md={5}>
              <Box 
                component="form" 
                onSubmit={handleSave}
                sx={{ 
                  p: 3, 
                  backgroundColor: '#fafafa', 
                  borderRadius: '12px', 
                  border: '1px solid #e8e8e8',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ borderBottom: '2px solid #1890ff', pb: 1, fontWeight: 600 }}>
                    📍 Coordonnées Capturées
                  </Typography>
                  
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Source :</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1890ff' }}>{source}</Typography>
                  </Box>

                  <Box sx={{ p: 1.5, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
                    <Typography variant="subtitle2" color="primary">Latitude :</Typography>
                    <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>{lat}</Typography>
                  </Box>

                  <Box sx={{ p: 1.5, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
                    <Typography variant="subtitle2" color="primary">Longitude :</Typography>
                    <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>{lng}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Nom de la parcelle / exploitation :
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Ex: Secteur Olives Nord"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      size="small"
                      sx={{ backgroundColor: '#ffffff' }}
                    />
                  </Box>
                </Stack>

                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  sx={{ mt: 3, fontWeight: 'bold', py: 1 }}
                >
                  Enregistrer la nouvelle localisation
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}