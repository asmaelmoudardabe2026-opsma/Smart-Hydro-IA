import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// project imports
import MainCard from 'components/MainCard';

export default function SamplePage() {
  // Liste initiale des notifications (l'alerte par défaut)
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'error',
      title: 'Alerte Stress Hydrique - Secteur Zone A',
      message: 'Le modèle prédictif a détecté une baisse anormale de l\'humidité du sol combinée à une forte évapotranspiration sur la région de Marrakech. Une irrigation immédiate est recommandée pour les cultures de blé.'
    }
  ]);

  // Fonction pour ajouter l'alerte de simulation lors du clic
  const simulerNouvelleAlerte = () => {
    const nouvelleAlerte = {
      id: Date.now(),
      type: 'warning',
      title: '⚠️ Nouvelle Alerte IA - Capteur Nord',
      message: 'Évapotranspiration critique détectée à Marrakech. Le système suggère d\'activé l\'irrigation automatisée dans 15 minutes.'
    };

    // Ajoute la nouvelle alerte tout en haut de la liste
    setNotifications([nouvelleAlerte, ...notifications]);
  };

  return (
    <Grid container spacing={3}>
      {/* En-tête avec titre et bouton de simulation */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Centre de Notifications - Alertes Hydro-IA
        </Typography>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={simulerNouvelleAlerte}
          sx={{ fontWeight: 'bold', textTransform: 'none', borderRadius: '6px', px: 3 }}
        >
          Simuler une Alerte en Direct
        </Button>
      </Grid>

      {/* Liste des alertes affichées */}
      <Grid item xs={12}>
        <MainCard title="Alertes en temps réel">
          <Stack spacing={3}>
            {notifications.map((notif) => (
              <Box key={notif.id}>
                <Alert 
                  severity={notif.type} 
                  variant="outlined" 
                  sx={{ 
                    borderRadius: '8px', 
                    p: 2,
                    backgroundColor: notif.type === 'error' ? '#fff1f0' : '#fffbe6',
                    borderColor: notif.type === 'error' ? '#ffccc7' : '#ffe58f'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, color: notif.type === 'error' ? '#ff4d4f' : '#faad14' }}>
                    {notif.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notif.message}
                  </Typography>
                </Alert>

                {/* Pied de l'alerte */}
                <Box sx={{ mt: 1, px: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#52c41a' }} />
                  <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                    Rapport Système — Données synchronisées en direct
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}