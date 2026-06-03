import { useRef, useState } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';

// assets
import BellOutlined from '@ant-design/icons/BellOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

const avatarSX = { width: 36, height: 36, fontSize: '1rem' };
const actionSX = { mt: '6px', ml: 1, top: 'auto', right: 'auto', alignSelf: 'flex-start', transform: 'none' };

export default function Notification() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [read, setRead] = useState(2);
  const [open, setOpen] = useState(false);
  const handleToggle = () => { setOpen((prevOpen) => !prevOpen); };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton color="secondary" variant="light" sx={{ color: 'text.primary', bgcolor: open ? 'grey.100' : 'transparent' }} onClick={handleToggle} ref={anchorRef}>
        <Badge badgeContent={read} color="primary"><BellOutlined /></Badge>
      </IconButton>
      <Popper placement={downMD ? 'bottom' : 'bottom-end'} open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Transitions type="grow" position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } })}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard title="Notifications" elevation={0} border={false} content={false} secondary={
                    read > 0 && (
                      <Tooltip title="Tout marquer comme lu">
                        <IconButton color="success" size="small" onClick={() => setRead(0)}>
                          <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                        </IconButton>
                      </Tooltip>
                    )
                }>
                  <List component="nav" sx={{ p: 0, '& .MuiListItemButton-root': { py: 0.5, px: 2, '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' }, '& .MuiAvatar-root': avatarSX, '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' } } }}>
                    
                    {/* التنبيه 1 */}
                    <ListItem component={ListItemButton} divider selected={read > 0} secondaryAction={<Typography variant="caption" noWrap>03:00</Typography>}>
                      <ListItemAvatar><Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}><GiftOutlined /></Avatar></ListItemAvatar>
                      <ListItemText primary={<Typography variant="h6">C'est l'anniversaire de <Typography component="span" variant="subtitle1">Cristina Danny</Typography> aujourd'hui.</Typography>} secondary="Il y a 2 min" />
                    </ListItem>

                    {/* التنبيه 2 */}
                    <ListItem component={ListItemButton} divider secondaryAction={<Typography variant="caption" noWrap>06:00</Typography>}>
                      <ListItemAvatar><Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}><MessageOutlined /></Avatar></ListItemAvatar>
                      <ListItemText primary={<Typography variant="h6"><Typography component="span" variant="subtitle1">Aida Burg</Typography> a commenté votre publication.</Typography>} secondary="5 août" />
                    </ListItem>

                    {/* التنبيه 3 */}
                    <ListItem component={ListItemButton} divider selected={read > 0} secondaryAction={<Typography variant="caption" noWrap>14:45</Typography>}>
                      <ListItemAvatar><Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}><SettingOutlined /></Avatar></ListItemAvatar>
                      <ListItemText primary={<Typography variant="h6">Votre profil est complet à <Typography component="span" variant="subtitle1">60%</Typography></Typography>} secondary="Il y a 7 heures" />
                    </ListItem>

                    {/* التنبيه 4 */}
                    <ListItem component={ListItemButton} divider secondaryAction={<Typography variant="caption" noWrap>21:10</Typography>}>
                      <ListItemAvatar><Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>C</Avatar></ListItemAvatar>
                      <ListItemText primary={<Typography variant="h6"><Typography component="span" variant="subtitle1">Cristina Danny</Typography> vous a invité à une <Typography component="span" variant="subtitle1">Réunion.</Typography></Typography>} secondary="Réunion quotidienne Scrum" />
                    </ListItem>

                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText primary={<Typography variant="h6" sx={{ color: 'primary.main' }}>Voir tout</Typography>} />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}