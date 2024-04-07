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
            { id: 2, value: 700, label: 'Hard spending' },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
        },
      ]}
      width={450}
      height={280}
    />
  );
}
