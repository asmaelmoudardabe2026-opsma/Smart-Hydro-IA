import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// assets
import SaveOutlined from '@ant-design/icons/SaveOutlined';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // 🔍 Charge les données actuelles de l'inscription pour remplir les inputs
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setName(data.name || '');
      setEmail(data.email || '');
      setLocation(data.location || '');
    }
  }, []);

  const handleSaveChanges = () => {
    if (!name || !email) {
      alert("Le nom et l'email ne peuvent pas être vides.");
      return;
    }

    const updatedProfile = { name, email, location };
    
    // 💾 Sauvegarde globale des modifications appliquées
    localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
    
    alert("Profil mis à jour avec succès !");
    
    // Redirection automatique vers la page d'affichage du profil pour voir le résultat
    window.location.href = '/free/view-profile'; 
  };

  return (
    <Card sx={{ p: 3, boxShadow: 1 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Modifier mon Profil</Typography>
      <Typography color="textSecondary" variant="body2" sx={{ mb: 4 }}>
        Ajustez vos informations personnelles ci-dessous.
      </Typography>

      <Grid container spacing={3} alignItems="flex-end">
        {/* Input Nom complet */}
        <Grid item xs={12} md={3}>
          <Stack spacing={1}>
            <InputLabel>Nom complet</InputLabel>
            <OutlinedInput 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              fullWidth 
            />
          </Stack>
        </Grid>

        {/* Input Email */}
        <Grid item xs={12} md={3}>
          <Stack spacing={1}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth 
            />
          </Stack>
        </Grid>

        {/* Input Emplacement */}
        <Grid item xs={12} md={3}>
          <Stack spacing={1}>
            <InputLabel>Emplacement</InputLabel>
            <OutlinedInput 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              fullWidth 
            />
          </Stack>
        </Grid>

        {/* Bouton Sauvegarder */}
        <Grid item xs={12} md={3}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveOutlined />} 
            onClick={handleSaveChanges}
            fullWidth
            size="large"
            sx={{ height: '50px' }}
          >
            Sauvegarder le profil
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}