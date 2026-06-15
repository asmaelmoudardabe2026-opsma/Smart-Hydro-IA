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

export default function NotificationPage() {
  // Liste initiale des notifications (l'alerte par défaut que vous aviez)
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'error',
      title: 'Alerte Stress Hydrique - Secteur Zone A',
      message: 'Le modèle prédictif a détecté une baisse anormale de l\'humidité du sol combinée à une forte évapotranspiration sur la région de Marrakech. Une irrigation immédiate est recommandée pour les cultures de blé.'
    }
  ]);

  // Fonction magique pour ajouter une alerte quand on clique sur le bouton
  const simulerNouvelleAlerte = () => {
    const nouvelleAlerte = {
      id: Date.now(), // ID unique basé sur le temps
      type: 'warning', // Couleur orange pour l'avertissement
      title: '⚠️ Nouvelle Alerte IA - Capteur Nord',
      message: 'Évapotranspiration critique détectée à Marrakech. Le système suggère d\'activer l\'irrigation automatisée dans 15 minutes.'
    };

    // On ajoute la nouvelle alerte tout en haut de la liste
    setNotifications([nouvelleAlerte, ...notifications]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Centre de Notifications - Alertes Hydro-IA
        </Typography>

        {/* BOUTON DE SIMULATION POUR VOTRE PRÉSENTATION */}
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={simulerNouvelleAlerte}
          sx={{ fontWeight: 'bold', textTransform: 'none', borderRadius: '6px' }}
        >
          Simuler une Alerte en Direct
        </Button>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Alertes en temps réel">
          <Stack spacing={3}>
            {notifications.map((notif) => (
              <Box key={notif.id} sx={{ position: 'relative' }}>
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
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {notif.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notif.message}
                  </Typography>
                </Alert>

                {/* Petit message système sous l'alerte */}
                <Box sx={{ mt: 1, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1890ff' }} />
                  <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                    Rapport Système — Dernière synchronisation : Il y a quelques instants
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