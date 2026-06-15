import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthRegister from 'sections/auth/AuthRegister'; // 🚀 Assure-toi que le chemin pointe bien vers le fichier du haut

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Inscription</Typography>
            <Typography component={Link} to="/free/login" variant="body1" sx={{ textDecoration: 'none', color: 'primary.main' }}>
              Déjà un compte ?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* Appel du formulaire configuré pour FastAPI */}
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}