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

  // الحالات الجديدة الخاصة بالتوصيات القادمة من الـ Backend
  const [recommendation, setRecommendation] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    const handleMapMessage = (event) => {
      if (event.data && event.data.source === 'leaflet-map') {
        setLat(Number(event.data.lat).toFixed(6));
        setLng(Number(event.data.lng).toFixed(6));
        setSource(event.data.type === 'click' ? 'Position sélectionnée par clic' : 'Position ajustée par marqueur');
        setSuccessMsg(''); // Efface le message précédent lors d'un nouveau clic
        setRecommendation(null); // تهيئة التوصيات عند اختيار موقع جديد
        setErrorMsg('');
      }
    };

    window.addEventListener('message', handleMapMessage);
    return () => window.removeEventListener('message', handleMapMessage);
  }, []);

  // دالة الحفظ المحدثة لإرسال الإحداثيات إلى الـ Backend وجلب التوصيات
  const handleSave = async (e) => {
    e.preventDefault();
    if (!farmName.trim()) {
      alert("Veuillez saisir un nom pour la parcelle avant d'enregistrer.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setRecommendation(null);
    setSuccessMsg('');

    try {
      // استدعاء سيرفر Node.js (server.js) الحقيقي على المنفذ 5000
      const response = await fetch(`http://localhost:5000/api/recommendation?lat=${lat}&lng=${lng}`);
      if (!response.ok) {
        throw new Error("Impossible de récupérer les recommandations pour cet emplacement.");
      }
      
      const data = await response.json();
      
      // تخزين البيانات القادمة من السيرفر بنجاح
      setRecommendation(data);
      setSuccessMsg(`Succès ! La parcelle "${farmName}" a été enregistrée aux coordonnées [${lat}, ${lng}].`);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Une erreur est survenue lors de la communication avec le backend.");
    } finally {
      setLoading(false);
    }
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
         Tableau de Bord de Gestion et Ravitaillement Hydrique — Marrakech
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
            {/* الخريطة تفاعلية */}
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

            {/* نموذج إدخال البيانات والتحكم */}
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
                  disabled={loading}
                  sx={{ mt: 3, fontWeight: 'bold', py: 1 }}
                >
                  {loading ? 'Chargement...' : 'Enregistrer la nouvelle localisation'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* أقسام المعالجة والتحميل والأخطاء */}
      {loading && (
        <Grid item xs={12}>
          <Alert severity="info" sx={{ borderRadius: '8px' }}>
            Analyse des données météo en cours pour les coordonnées [{lat}, {lng}]...
          </Alert>
        </Grid>
      )}

      {errorMsg && (
        <Grid item xs={12}>
          <Alert severity="error" sx={{ borderRadius: '8px' }}>
            {errorMsg}
          </Alert>
        </Grid>
      )}

      {/* 🌟 عرض المخرجات بنظام كارتين في الصف الأول وكارتين في الصف الثاني 🌟 */}
      {recommendation && (
        <Grid item xs={12}>
          <MainCard title={`💡 Recommandations d'Irrigation Optimisées pour : ${farmName}`}>
            <Grid container spacing={3}>
              
              {/* --- الصف الأول --- */}
              {/* 1. كارت حالة الطقس - Condition Météo */}
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #90caf9', height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#0d47a1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    ☁️ Condition Météo
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: '700', color: '#1565c0' }}>
                    {recommendation.weather_status || 'Non disponible'}
                  </Typography>
                </Box>
              </Grid>

              {/* 2. كارت درجة الحرارة - Température */}
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3, backgroundColor: '#fff3e0', borderRadius: '8px', border: '1px solid #ffcc80', height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#e65100" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    🌡️ Température
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: '700', color: '#ef6c00' }}>
                    {recommendation.temperature !== undefined ? `${recommendation.temperature} °C` : '-- °C'}
                  </Typography>
                </Box>
              </Grid>

              {/* --- الصف الثاني --- */}
              {/* 3. كارت الاحتياج المائي - Besoin en Eau */}
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3, backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #a5d6a7', height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#1b5e20" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    💧 Besoin en Eau
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: '800', color: '#2e7d32' }}>
                    {recommendation.water_volume || '0'} m³ / hectare
                  </Typography>
                </Box>
              </Grid>

              {/* 4. كارت التوصية والنصيحة الكاملة - Recommandation */}
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 3, backgroundColor: '#f3e5f5', borderRadius: '8px', border: '1px solid #ce93d8', height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#4a148c" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    📌 Recommandation
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4a148c', lineHeight: 1.5, fontWeight: '500' }}>
                    {recommendation.advice || "Aucun conseil spécifique pour le moment."}
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
}