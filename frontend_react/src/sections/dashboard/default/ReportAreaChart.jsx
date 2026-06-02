// material-ui
import { useTheme } from '@mui/material/styles';

import { axisClasses, chartsGridClasses, LineChart, lineClasses } from '@mui/x-charts';

const data = [58, 115, 28, 83, 63, 75, 35];

// 🎨 Trjma dyal les mois l l-Français
const labels = ['Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

// ==============================|| REPORT AREA CHART ||============================== //

export default function ReportAreaChart() {
  const theme = useTheme();

  return (
    <LineChart
      hideLegend
      grid={{ horizontal: true }}
      xAxis={[{ data: labels, scaleType: 'point', disableLine: true, tickSize: 7 }]}
      yAxis={[{ tickMaxStep: 20, position: 'none' }]}
      // 🎨 Baddelna 'Series 1' l 'Rapport' bach t-matchy perfectly
      series={[{ data, showMark: false, id: 'ReportAreaChart', color: theme.vars.palette.warning.main, label: 'Rapport' }]}
      height={340}
      margin={{ top: 30, bottom: 25, left: 20, right: 20 }}
      sx={{
        [`& .${lineClasses.line}`]: { strokeWidth: 1 },
        [`& .${chartsGridClasses.line}`]: { strokeDasharray: '4 4' },
        [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' }
      }}
    />
  );
}