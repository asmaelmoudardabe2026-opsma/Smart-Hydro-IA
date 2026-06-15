'use client';

import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AnimateButton from 'components/@extended/AnimateButton';

export default function AuthRegister() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [gps, setGps] = useState('');
  const [cultureType, setCultureType] = useState('Légumes');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!prenom || !nom || !email || !password || !gps) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/register', {
        prenom, nom, email, gps, culture_type: cultureType, password
      });

      alert("Compte créé avec succès ! Connectez-vous maintenant.");
      window.location.href = '/free/login';

    } catch (error) {
      setIsSubmitting(false);
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        setErrorMessage(typeof detail === 'string' ? detail : "Erreur de validation des données.");
      } else {
        setErrorMessage("Le serveur FastAPI est injoignable.");
      }
    }
  };

  return (
    <form noValidate onSubmit={handleRegister}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel>Prénom*</InputLabel>
            <OutlinedInput type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} fullWidth />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel>Nom*</InputLabel>
            <OutlinedInput type="text" value={nom} onChange={(e) => setNom(e.target.value)} fullWidth />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Adresse e-mail*</InputLabel>
            <OutlinedInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel>Localisation GPS*</InputLabel>
            <OutlinedInput type="text" value={gps} onChange={(e) => setGps(e.target.value)} placeholder="Ex: 31.6295, -7.9811" fullWidth />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel>Type de Culture</InputLabel>
            <Select value={cultureType} onChange={(e) => setCultureType(e.target.value)} fullWidth>
              <MenuItem value="Fruits">Fruits</MenuItem>
              <MenuItem value="Légumes">Légumes</MenuItem>
              <MenuItem value="Céréales">Céréales</MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Mot de passe*</InputLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          </Stack>
        </Grid>
        {errorMessage && (
          <Grid item xs={12}>
            <FormHelperText error sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              {errorMessage}
            </FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button disabled={isSubmitting} type="submit" fullWidth size="large" variant="contained" color="primary">
              {isSubmitting ? 'Création...' : 'Créer un compte'}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}