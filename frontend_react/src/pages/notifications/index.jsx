// src/pages/notifications/index.jsx
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project import
import MainCard from 'components/MainCard';

// icons
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

// ==============================|| PAGE DES NOTIFICATIONS ||============================== //

export default function NotificationsPage() {
  
  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Alerte : Fuite d\'eau détectée !',
      message: 'Une consommation anormale a été repérée dans la Zone Nord (Marrakech).',
      time: 'Il y a 5 min',
      color: '#ff4d4f',
      bg: '#fff2f0',
      icon: <WarningOutlined style={{ color: '#ff4d4f' }} />
    },
    {
      id: 2,
      type: 'warning',
      title: 'Avertissement : Niveau d\'eau faible',
      message: 'Le réservoir principal de la Zone Sud (Ourika) est en dessous de 20%.',
      time: 'Il y a 1 heure',
      color: '#faad14',
      bg: '#fffbe6',
      icon: <WarningOutlined style={{ color: '#faad14' }} />
    },
    {
      id: 3,
      type: 'success',
      title: 'Succès : Irrigation terminée',
      message: 'Le cycle d\'irrigation automatique s\'est déroulé avec succès sur le secteur Olivier.',
      time: 'Il y a 3 heures',
      color: '#52c41a',
      bg: '#f6ffed',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    }
  ];

  return (
    <MainCard title="Alertes & Notifications - HydroSecure">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Suivi en temps réel de l'état de vos capteurs et de votre système d'irrigation.
      </Typography>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {alerts.map((alert) => (
          <ListItem 
            key={alert.id}
            alignItems="flex-start"
            sx={{
              mb: 2,
              borderRadius: '8px',
              borderLeft: `5px solid ${alert.color}`,
              backgroundColor: alert.bg,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)'
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'transparent' }}>
                {alert.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600 }}>
                    {alert.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.time}
                  </Typography>
                </Stack>
              }
              secondary={
                <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                  {alert.message}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </MainCard>
  );
}