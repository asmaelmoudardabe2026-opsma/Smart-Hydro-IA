import { useState, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';

export default function DashboardDefault() {
  const [clickCoords, setClickCoords] = useState({ lat: '31.6295', lng: '-7.9811' });
  const [stationName, setStationName] = useState("Emplacement de la ferme (Par défaut)");

  useEffect(() => {
    const handleMapMessage = (event) => {
      if (event.data && event.data.source === 'leaflet-map') {
        setClickCoords({
          lat: event.data.lat.toFixed(6),
          lng: event.data.lng.toFixed(6)
        });
        setStationName(event.data.type === 'click' ? "Position sélectionnée par clic" : "Position ajustée par marqueur");
      }
    };

    window.addEventListener('message', handleMapMessage);
    return () => window.removeEventListener('message', handleMapMessage);
  }, []);

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
    <Grid container spacing={4.5}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Gestion de la Ferme Intelligente - Localisation & Extraction de Coordonnées
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard title="Statut du Projet">
          <Typography variant="h4" color="primary" sx={{ my: 2 }}>Prêt pour sélection</Typography>
          <Typography variant="body2" color="textSecondary">
            Cliquez sur n'importe quel point de la carte de Marrakech pour extraire instantanément la position.
          </Typography>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard title="Analyse Géographique IA">
          <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', mt: 1 }}>
            💡 Analyse du sol et évaporation
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1.5 }}>
            Les valeurs de Latitude et Longitude extraites alimentent le modèle pour estimer le taux d'évapotranspiration.
          </Typography>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Carte Interactive - Région de Marrakech">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <iframe
                title="Interactive Map Selection"
                srcDoc={iframeSourceCode}
                style={{ width: '100%', height: '450px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ p: 3, height: '100%', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid #e8e8e8' }}>
                <Typography variant="h6" sx={{ borderBottom: '2px solid #1890ff', pb: 1, mb: 3, fontWeight: 600 }}>
                  📊 Coordonnées Extraites du Point
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Source de la sélection :</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1890ff' }}>{stationName}</Typography>
                  </Box>
                  <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>Latitude :</Typography>
                    <Typography variant="h4" sx={{ fontFamily: 'monospace', mt: 1 }}>{clickCoords.lat}</Typography>
                  </Box>
                  <Box sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d9d9d9' }}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>Longitude :</Typography>
                    <Typography variant="h4" sx={{ fontFamily: 'monospace', mt: 1 }}>{clickCoords.lng}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 2 }}>
                    ✨ Ces valeurs changent dynamiquement en direct lors du clic ou du déplacement du marqueur.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}