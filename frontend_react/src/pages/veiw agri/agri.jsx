import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import FireOutlined from '@ant-design/icons/FireOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import ExperimentOutlined from '@ant-design/icons/ExperimentOutlined';
import CloudOutlined from '@ant-design/icons/CloudOutlined';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';

// ==============================|| LOGO ||============================== //
const HydroTreeLogo = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5C12 2.5 19 8.5 19 13.5C19 17.37 15.87 20.5 12 20.5C8.13 20.5 5 17.37 5 13.5C5 8.5 12 2.5 12 2.5Z"
      fill="url(#waterGrad)"
    />
    <defs>
      <linearGradient id="waterGrad" x1="12" y1="2.5" x2="12" y2="20.5">
        <stop offset="0%" stopColor="#29b08c" />
        <stop offset="100%" stopColor="#00d463" />
      </linearGradient>
    </defs>
  </svg>
);

// ==============================|| DASHBOARD DEFAULT ||============================== //

export default function DashboardDefault() {

  const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user_profile'));

      console.log('USER PROFILE =', user);

      if (!user || !user.location) {
        console.log('No location found');
        return;
      }

      const city = user.location
  .split(',')[0]
  .trim()
  .toLowerCase();

      console.log('CITY SENT =', city);

      const response = await axios.get(
        `http://localhost:5000/weather/${city}`
        
      );

      console.log('API RESPONSE =', response.data);
      console.log('DATA =', response.data.data);

      setWeatherData(response.data.data);

    } catch (error) {
      console.error('Weather API error:', error);
    }
  };

  fetchWeather();
}, []);
console.log('WEATHER STATE =', weatherData);
  return (
    <Box sx={{ bgcolor: '#bae0ff', p: 3, borderRadius: 3, minHeight: '100vh' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>

        {/* ================= HEADER ================= */}
        <Grid size={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#fff', width: 54, height: 54 }}>
              <HydroTreeLogo />
            </Avatar>

            <Stack>
              <Typography variant="h4" sx={{ color: '#002c8c', fontWeight: 700 }}>
                Smart Hydro Secure
              </Typography>
              <Typography variant="caption" sx={{ color: '#0052d4' }}>
                Système de Surveillance & Contrôle
              </Typography>
            </Stack>
          </Stack>
        </Grid>

{/* ================= WEATHER TITLE ================= */}
<Grid size={12}>
  <Typography
    variant="h6"
    sx={{
      mt: 2,
      color: '#002c8c',
      fontWeight: 700
    }}
  >
    Données Météo (IA)
  </Typography>
</Grid>

{/* ================= WEATHER ROW ================= */}

{/* Température */}
<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
  <Box
    sx={{
      '& .MuiPaper-root': {
        background: 'rgba(255,255,255,0.15) !important',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 3
      }
    }}
  >
    <AnalyticEcommerce
      title="Température"
      count={weatherData ? `${weatherData.temperature} °C` : '--'}
      color="error"
      icon={<FireOutlined />}
      labelText="Ville : "
      extra={weatherData?.city || '--'}
    />
  </Box>
</Grid>

{/* Recommandation */}
<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
  <Box
    sx={{
      '& .MuiPaper-root': {
        background: 'rgba(255,255,255,0.15) !important',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 3
      }
    }}
  >
    <AnalyticEcommerce
      title="Recommandation"
      count={weatherData ? weatherData.recommendation : '--'}
      color="success"
      icon={<ThunderboltOutlined />}
      labelText="Décision IA : "
      extra="Irrigation"
    />
  </Box>
</Grid>

{/* Besoin en Eau */}
<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
  <Box
    sx={{
      '& .MuiPaper-root': {
        background: 'rgba(255,255,255,0.15) !important',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 3
      }
    }}
  >
    <AnalyticEcommerce
      title="Besoin en Eau"
      count={weatherData ? weatherData.estimated_water_need : '--'}
      color="primary"
      icon={<ExperimentOutlined />}
      labelText="Analyse : "
      extra="Smart Hydro AI"
    />
  </Box>
</Grid>

{/* Condition Météo */}
<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
  <Box
    sx={{
      '& .MuiPaper-root': {
        background: 'rgba(255,255,255,0.15) !important',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 3
      }
    }}
  >
    <AnalyticEcommerce
      title="Condition Météo"
      count={weatherData ? weatherData.weather_condition : '--'}
      color="warning"
      icon={<CloudOutlined />}
      labelText="OpenWeather : "
      extra="Temps réel"
    />
  </Box>
</Grid>




        {/* ================= GRAPHS ================= */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <UniqueVisitorCard />
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">
                Statistiques de la semaine
              </Typography>
              <Typography variant="h3">
                8 750 Litres
              </Typography>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>

      </Grid>
    </Box>
  );
}