import { LineChart } from '@mui/x-charts/LineChart';

interface BasicLineChartProps {
  xAxisData: number[];
  seriesData: number[];
  width: number;
  height: number;
  xAxisMin?: number;
  xAxisMax?: number;
  yAxisMin?: number;
  yAxisMax?: number;
}

export default function BasicLineChart({
  xAxisData,
  seriesData,
  width,
  height,
  xAxisMin,
  xAxisMax,
  yAxisMin,
  yAxisMax,
}: BasicLineChartProps) {
  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          min: xAxisMin,
          max: xAxisMax,
          tickNumber: 2,
          disableLine: true,
        },
      ]}
      yAxis={[
        {
          min: yAxisMin,
          max: yAxisMax,
          tickNumber: 3,
          disableLine: true,
        },
      ]}
      series={[
        {
          data: seriesData,
          showMark: false,
        },
      ]}
      width={width}
      height={height}
    />
  );
}
