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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';

// project imports
import MainCard from 'components/MainCard';

// Icon d Enregistrer kī l-photo
import SaveOutlined from '@ant-design/icons/SaveOutlined';

export default function EditLocalisation() {
  const [capteur, setCapteur] = useState('Capteur Zone Nord (Marrakech)');
  const [emplacement, setEmplacement] = useState('Zone Nord - Irrigation');
  const [latitude, setLatitude] = useState('31.6295');
  const [longitude, setLongitude] = useState('-7.9811');

  // الحالات الجديدة للربط الحقيقي مع الـ Backend والتحميل
  const [recommendationData, setRecommendationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // دالة الإرسال المحدثة لربط واجهة التعديل بالسيرفر مباشرة
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emplacement.trim()) {
      alert("Veuillez saisir un nom pour l'emplacement avant d'enregistrer.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setRecommendationData(null);

    try {
      // استدعاء سيرفر Node.js (server.js) الحقيقي للحصول على البيانات الحية لمراكش بناءً على الإحداثيات المعدلة
      const response = await fetch(`http://localhost:5000/api/recommendation?lat=${latitude}&lng=${longitude}`);
      if (!response.ok) {
        throw new Error("Impossible de récupérer les recommandations pour ces coordonnées.");
      }
      
      const data = await response.json();
      
      // تخزين البيانات بنجاح في حالة الاستجابة الصحيحة
      setRecommendationData(data);
      setSuccessMsg(`Modifications enregistrées avec succès pour "${emplacement}" !`);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Une erreur est survenue lors de la communication avec le backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* l-Titre lmsal kī l-photo */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1e293b' }}>
        Edit Localisation
      </Typography>

      {/* رسائل النجاح أو الأخطاء في التحديث */}
      {successMsg && (
        <Alert severity="success" variant="filled" sx={{ borderRadius: '8px', mb: 3 }}>
          {successMsg}
        </Alert>
      )}

      {errorMsg && (
        <Alert severity="error" sx={{ borderRadius: '8px', mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {loading && (
        <Alert severity="info" sx={{ borderRadius: '8px', mb: 3 }}>
          Analyse des données météo en cours pour les coordonnées coordonnées de Marrakech...
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card sx={{ bgcolor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 4 }}>
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
                    disabled={loading}
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
                    {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setRecommendationData(null);
                      setSuccessMsg('');
                      setErrorMsg('');
                    }}
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

      {/* 🌟 استعراض البيانات الحقيقية المحسوبة بنظام Two and Two في الأسفل بعد الحفظ بنجاح 🌟 */}
      {recommendationData && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title={`💡 Analyse Prédictive d'Irrigation - ${emplacement}`}>
              <Grid container spacing={3}>
                
                {/* 1. كارت حالة الطقس - Condition Météo */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #90caf9', height: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#0d47a1" sx={{ mb: 1 }}>
                      ☁️ Condition Météo
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: '700', color: '#1565c0' }}>
                      {recommendationData.weather_status || 'Non disponible'}
                    </Typography>
                  </Box>
                </Grid>

                {/* 2. كارت درجة الحرارة - Température */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, backgroundColor: '#fff3e0', borderRadius: '8px', border: '1px solid #ffcc80', height: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#e65100" sx={{ mb: 1 }}>
                      🌡️ Température
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: '700', color: '#ef6c00' }}>
                      {recommendationData.temperature !== undefined ? `${recommendationData.temperature} °C` : '-- °C'}
                    </Typography>
                  </Box>
                </Grid>

                {/* 3. كارت الاحتياج المائي - Besoin en Eau */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #a5d6a7', height: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#1b5e20" sx={{ mb: 1 }}>
                      💧 Besoin en Eau
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: '800', color: '#2e7d32' }}>
                      {recommendationData.water_volume || '0'} m³ / hectare
                    </Typography>
                  </Box>
                </Grid>

                {/* 4. كارت التوصية والنصيحة الكاملة - Recommandation */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, backgroundColor: '#f3e5f5', borderRadius: '8px', border: '1px solid #ce93d8', height: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#4a148c" sx={{ mb: 1 }}>
                      📌 Recommandation Générale
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a148c', lineHeight: 1.5, fontWeight: '500' }}>
                      {recommendationData.advice || "Aucun conseil spécifique pour le moment."}
                    </Typography>
                  </Box>
                </Grid>

              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}