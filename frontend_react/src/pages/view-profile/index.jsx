import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';

// assets
import MailOutlined from '@ant-design/icons/MailOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';

export default function ViewProfile() {
  const [profile, setProfile] = useState({
    name: 'Chargement...',
    email: 'email@example.com',
    location: 'Marrakech, Maroc'
  });

  useEffect(() => {
    // 🔍 Récupère dynamiquement les infos sauvegardées à l'inscription
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Mon Profil</Typography>
      </Grid>
      
      {/* Profil à Gauche */}
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 3, textAlign: 'center', boxShadow: 1 }}>
          <Avatar sx={{ width: 90, height: 90, mx: 'auto', mb: 2, bgcolor: 'primary.lighter', color: 'primary.main' }}>
            {profile.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4">{profile.name}</Typography>
          <Typography color="textSecondary" variant="subtitle2" sx={{ mt: 0.5 }}>
            Administrateur HydroSecure
          </Typography>
        </Card>
      </Grid>

      {/* Informations à Droite */}
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3, boxShadow: 1 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Informations Personnelles
          </Typography>
          
          <Stack spacing={3}>
            {/* Ligne Email */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'grey.100', color: 'grey.700', width: 40, height: 40 }}>
                <MailOutlined />
              </Avatar>
              <Stack>
                <Typography variant="caption" color="textSecondary">Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{profile.email}</Typography>
              </Stack>
            </Stack>

            {/* Ligne Emplacement */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'grey.100', color: 'grey.700', width: 40, height: 40 }}>
                <EnvironmentOutlined />
              </Avatar>
              <Stack>
                <Typography variant="caption" color="textSecondary">Emplacement</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{profile.location}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}