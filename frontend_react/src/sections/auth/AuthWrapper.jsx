import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Stack sx={{ minHeight: '100vh', justifyContent: 'center' }}>
        <Box sx={{ px: 3, py: 3 }} size={12}>
          <Logo to="/" />
        </Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };