// material-ui
import { useTheme } from '@mui/material/styles';

import { axisClasses, barClasses, BarChart } from '@mui/x-charts';

const data = [80, 95, 70, 42, 65, 55, 78];

// 🎨 Trjma dyal l-iyam dyal s-semana l l-Français (Lu, Ma, Me...)
const xLabels = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  return (
    <BarChart
      hideLegend
      height={380}
      series={[{ data, label: 'Litres' }]} // 🎨 Rddnah 'Litres' f blasset 'Series-1' bach t-matchy m3a l-vibe
      xAxis={[{ data: xLabels, scaleType: 'band', tickSize: 7, disableLine: true, categoryGapRatio: 0.4 }]}
      yAxis={[{ position: 'none' }]}
      slotProps={{ bar: { rx: 5, ry: 5 } }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.vars.palette.info.light]}
      sx={{
        [`& .${barClasses.element}:hover`]: { opacity: 0.6 },
        [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' }
      }}
    />
  );
}