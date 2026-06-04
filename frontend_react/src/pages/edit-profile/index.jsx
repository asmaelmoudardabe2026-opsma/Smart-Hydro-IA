import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import SaveOutlined from '@ant-design/icons/SaveOutlined';

export default function EditProfile() {
  const [name, setName] = useState('Fatima');
  const [email, setEmail] = useState('fatima@example.com');
  const [location, setLocation] = useState('Marrakech, Maroc');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profil modifié avec succès !');
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1e293b' }}>
        Modifier mon Profil
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ bgcolor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="prof-name" sx={{ fontWeight: 500 }}>Nom complet</InputLabel>
                  <TextField id="prof-name" fullWidth value={name} onChange={(e) => setName(e.target.value)} InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="prof-email" sx={{ fontWeight: 500 }}>Email</InputLabel>
                  <TextField id="prof-email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="prof-loc" sx={{ fontWeight: 500 }}>Emplacement</InputLabel>
                  <TextField id="prof-loc" fullWidth value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: '8px' } }} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" startIcon={<SaveOutlined />} sx={{ bgcolor: '#1677ff', '&:hover': { bgcolor: '#0958d9' }, textTransform: 'none', borderRadius: '8px', px: 3, py: 1 }}>
                  Sauvegarder le profil
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}