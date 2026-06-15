import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// react-router
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// ==============================|| PROFILE HEADER ||============================== //

const HydroIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5C12 2.5 19 8.5 19 13.5C19 17.37 15.87 20.5 12 20.5C8.13 20.5 5 17.37 5 13.5C5 8.5 12 2.5 12 2.5Z" fill="#0052d4" />
    <path d="M12 17.5V11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [userName] = useState(
    JSON.parse(localStorage.getItem('user_profile'))?.name || 'Utilisateur'
  );

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  // ================= ACTIONS =================

  const handleViewProfile = () => {
    navigate('/profile');
    setOpen(false);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    navigate('/login');
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      
      {/* ===== BUTTON ===== */}
      <ButtonBase
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          p: 0.3,
          borderRadius: 1,
          bgcolor: open ? 'grey.200' : 'transparent'
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.lighter' }}>
            <HydroIcon />
          </Avatar>

          <Typography variant="subtitle2" sx={{ fontSize: '0.85rem' }}>
            {userName}
          </Typography>
        </Stack>
      </ButtonBase>

      {/* ===== DROPDOWN ===== */}
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ width: 220 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent>

                    <Stack spacing={1.2}>

                      <Typography variant="h6">
                        {userName}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Smart Hydro User
                      </Typography>

                      {/* ===== MENU ===== */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>

                        <Typography
                          onClick={handleViewProfile}
                          sx={{ cursor: 'pointer', fontSize: 13 }}
                        >
                          👁 View Profile
                        </Typography>

                        <Typography
                          onClick={handleEditProfile}
                          sx={{ cursor: 'pointer', fontSize: 13 }}
                        >
                          ✏️ Edit Profile
                        </Typography>

                        <Typography
                          onClick={handleLogout}
                          sx={{ cursor: 'pointer', fontSize: 13, color: 'red' }}
                        >
                          🚪 Logout
                        </Typography>

                      </Box>

                    </Stack>

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