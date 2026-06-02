import CropSelection from '../../sections/dashboard/CropSelection';
import Grid from '@mui/material/Grid';
import CropSelection from 'sections/dashboard/CropSelection';
import SaleReportCard from 'sections/dashboard/SaleReportCard';
import SalesChart from 'sections/dashboard/SalesChart';

export default function DefaultDashboard() {
  return (
    <Grid container spacing={3}>
      {/* Crop Selection (L-component l-jdid) */}
      <Grid item xs={12} md={6}>
        <CropSelection />
      </Grid>
      
      {/* Sales Report (L-component l-qdim) */}
      <Grid item xs={12} md={6}>
        <SaleReportCard />
      </Grid>
    </Grid>
  );
}