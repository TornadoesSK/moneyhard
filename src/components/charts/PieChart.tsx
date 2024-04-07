'use client';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 600, label: 'Free Cash' },
            { id: 1, value: 300, label: 'Investment' },
            { id: 2, value: 700, label: 'Fixed expenses' },
          ],
          innerRadius: '15%',
          outerRadius: '80%',
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          cy: '40%',
        },
      ]}
      height={300}
      slotProps={{
        legend: {
          direction: 'row',
          position: { horizontal: 'middle', vertical: 'bottom' },
        },
      }}
    />
  );
}
