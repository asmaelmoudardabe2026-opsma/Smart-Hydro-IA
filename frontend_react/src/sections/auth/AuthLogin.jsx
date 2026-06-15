'use client';

import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

export default function AuthLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    
    // 🚀 PLUS BESOIN DE BACKEND : Connexion directe et instantanée !
    // Crée une session fictive pour le frontend
    localStorage.setItem('user_session', JSON.stringify({ email: email, role: 'Administrateur' }));
    
    // Redirection immédiate vers le dashboard sur le port 3001
    window.location.href = window.location.origin + '/free/dashboard/default';
  };

  return (
    <form noValidate onSubmit={handleLogin}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Adresse e-mail (optionnel)</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smarthydro.com"
              fullWidth
            />
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Mot de passe (optionnel)</InputLabel>
            <OutlinedInput
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              fullWidth
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Accéder au Dashboard
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}