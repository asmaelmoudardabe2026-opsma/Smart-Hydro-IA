// src/components/logo/index.jsx
import { Link } from 'react-router-dom';
import { ButtonBase, Stack, Typography } from '@mui/material';
import LogoMain from './LogoMain';
import config from 'config';

export default function LogoSection() {
  return (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <LogoMain />
        {
        }
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111111', letterSpacing: '0.5px' }}>
          HydroSecure
        </Typography>
      </Stack>
    </ButtonBase>
  );
}