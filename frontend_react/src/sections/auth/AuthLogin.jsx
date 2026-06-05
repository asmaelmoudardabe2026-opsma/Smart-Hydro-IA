'use client';

import { useState } from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import axios from 'axios';

export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username: email,
        password: password
      });

      const token = response.data.access_token;
      localStorage.setItem('userToken', token);

      window.location.href = '/free/gestion-cultures';

    } catch (error) {
      alert("Adresse e-mail ou mot de passe incorrect !");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Adresse e-mail</InputLabel>
            <OutlinedInput 
              id="email-login" 
              type="email" 
              name="email" 
              placeholder="Entrez votre e-mail" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Mot de passe</InputLabel>
            <OutlinedInput
              fullWidth
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <FormControlLabel
              control={<Checkbox name="checked" color="primary" size="small" />}
              label={<Typography variant="h6">Rester connecté</Typography>}
            />
            <Link variant="h6" href="#" underline="none" color="primary">
              Mot de passe oublié ?
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth size="large" variant="contained" color="primary" type="submit">
            Connexion
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}