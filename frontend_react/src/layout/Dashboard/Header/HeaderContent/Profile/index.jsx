import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';

// Logo Icon
const HydroIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5C12 2.5 19 8.5 19 13.5C19 17.37 15.87 20.5 12 20.5C8.13 20.5 5 17.37 5 13.5C5 8.5 12 2.5 12 2.5Z" fill="#0052d4" />
    <path d="M12 17.5V11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => { setOpen((prevOpen) => !prevOpen); };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleLogout = async () => { console.log('Logout clicked'); };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{ p: 0.25, bgcolor: open ? 'grey.300' : 'transparent', borderRadius: 1 }}
        onClick={handleToggle}
        ref={anchorRef}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.lighter' }}><HydroIcon /></Avatar>
          <Typography variant="subtitle1">Administrateur</Typography>
        </Stack>
      </ButtonBase>
      <Popper placement="bottom-end" open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.lighter' }}><HydroIcon /></Avatar>
                      <Stack>
                        <Typography variant="h6">Administrateur</Typography>
                        <Typography variant="body2" color="text.secondary">Responsable HydroSecure</Typography>
                      </Stack>
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                      <ProfileTab handleLogout={handleLogout} />
                    </Box>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}