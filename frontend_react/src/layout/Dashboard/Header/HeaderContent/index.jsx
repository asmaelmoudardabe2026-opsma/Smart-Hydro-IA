// src/layout/Dashboard/Header/HeaderContent/index.jsx
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER CONTENT ||============================== //

export default function HeaderContent() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {/* L-Barra d l-ba7th */}
      {!downMD && <Search />}
      {downMD && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* ✂️ Hna kān d dāk l-icon d GitHub d pro, hyednah complet bach y-wllī l-header nqi! */}

      {/* Notification o l-Profile dyalk */}
      <Notification />
      {!downMD && <Profile />}
      {downMD && <MobileSection />}
    </>
  );
}