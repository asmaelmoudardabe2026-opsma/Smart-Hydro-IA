import { useState } from 'react';

// material-ui
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

// ==============================|| LOGO CUSTOM SVG ||============================== //
const HydroTreeLogo = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2.5C12 2.5 19 8.5 19 13.5C19 17.37 15.87 20.5 12 20.5C8.13 20.5 5 17.37 5 13.5C5 8.5 12 2.5 12 2.5Z" 
      fill="url(#waterGrad)" 
    />
    <path d="M12 17.5V11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 11C12 11 14 9 14 7C14 5 12 5 12 5C12 5 10 5 10 7C10 9 12 11 12 11Z" fill="#ffffff" />
    <path d="M12.5 13C12.5 13 15.5 12.5 16 10.5C16.5 8.5 15 7.5 15 7.5C15 7.5 13.5 8.5 13 10.5C12.5 12.5 12.5 13 12.5 13Z" fill="#ffffff" />
    <path d="M11.5 13C11.5 13 8.5 12.5 8 10.5C7.5 8.5 9 7.5 9 7.5C9 7.5 10.5 8.5 11 10.5C11.5 12.5 11.5 13 11.5 13Z" fill="#ffffff" />
    <defs>
      <linearGradient id="waterGrad" x1="12" y1="2.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00d2ff" />
        <stop offset="100%" stopColor="#0052d4" />
      </linearGradient>
    </defs>
  </svg>
);

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Box sx={{ bgcolor: '#bae0ff', p: 3, borderRadius: 3, minHeight: '100vh' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        
        {/* 🚀 Header block */}
        <Grid size={12} sx={{ mb: -1.5 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: '#ffffff',
                width: 54, 
                height: 54,
                boxShadow: '0px 6px 20px rgba(0, 82, 212, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              <HydroTreeLogo />
            </Avatar>
            
            <Stack>
              <Typography variant="h4" sx={{ color: '#002c8c', fontWeight: 700, letterSpacing: '-0.5px' }}>
                Smart Hydro Secure
              </Typography>
              <Typography variant="caption" sx={{ color: '#0052d4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Système de Surveillance & Contrôle
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        
        {/* row 1 - Titles & Cards */}
        <Grid size={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600, mt: 1 }}>
            Tableau de bord
          </Typography>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce 
            title="Humidité du Sol" 
            count="45 %" 
            percentage="Optimal" 
            color="success" 
            labelText="Statut actuel :" 
            extra="Zone A - Cultures" 
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce 
            title="Niveau du Réservoir" 
            count="82 %" 
            percentage={70.5} 
            color="primary" 
            labelText="Volume estimé :" 
            extra="12 400 Litres" 
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce 
            title="Consommation d'Eau" 
            count="1 250 L" 
            percentage={12.4} 
            isLoss 
            color="warning" 
            labelText="Économie vs hier :" 
            extra="-150 Litres" 
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce 
            title="État de la Pompe" 
            count="ON" 
            percentage="Auto" 
            color="info" 
            labelText="Prochain cycle :" 
            extra="À 20:00 (15 min)" 
          />
        </Grid>
        
        <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
        
        {/* row 2 - Main Graphs Only */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <UniqueVisitorCard />
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h5" sx={{ color: 'text.primary' }}>Aperçu de l'eau</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack sx={{ gap: 2 }}>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Statistiques de la semaine
                </Typography>
                <Typography variant="h3">8 750 Litres</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>

      </Grid>
    </Box>
  );
}