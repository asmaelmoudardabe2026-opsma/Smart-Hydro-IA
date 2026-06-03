import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import UserOutlined from '@ant-design/icons/UserOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';

export default function ViewProfile() {
  const user = {
    name: 'Fatima',
    role: 'Administrateur HydroSecure',
    email: 'fatima@example.com',
    location: 'Marrakech, Maroc'
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1e293b' }}>
        Mon Profil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: '12px', textAlign: 'center', p: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: '#e0f2fe', color: '#0284c7' }}>
                  <UserOutlined style={{ fontSize: '40px' }} />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{user.role}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Informations Personnelles</Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2.5}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <MailOutlined style={{ color: '#64748b', fontSize: '18px' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.email}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <EnvironmentOutlined style={{ color: '#64748b', fontSize: '18px' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Emplacement</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.location}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}