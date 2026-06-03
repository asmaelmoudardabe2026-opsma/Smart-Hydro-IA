import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import SalesChart from 'sections/dashboard/SalesChart';

// sales report status
// 🎨 Trjma dyal les options d l-select l l-Français
const status = [
  {
    value: 'today',
    label: "Aujourd'hui" // ➔ Today
  },
  {
    value: 'month',
    label: 'Ce mois-ci' // ➔ This Month
  },
  {
    value: 'year',
    label: 'Cette année' // ➔ This Year
  }
];

// ==============================|| DEFAULT - SALES REPORT ||============================== //

export default function SaleReportCard() {
  const [value, setValue] = useState('today');

  return (
    <>
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          {/* 🎨 Trjma dyal Sales Report */}
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Rapport des ventes</Typography>
        </Grid>
        <Grid>
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            slotProps={{ htmlInput: { sx: { py: 0.75, fontSize: '0.875rem' } } }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <SalesChart filter={value} />
    </>
  );
}