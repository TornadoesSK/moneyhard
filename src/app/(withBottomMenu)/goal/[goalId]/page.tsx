import { Box, Typography } from '@mui/material';
import LoggedHeader from '@/components/LoggedHeader';
import getInvestmentGoal from '@/db-operations/getInvestmentGoal';
import BasicLineChart from '@/components/charts/BasicLineChart';

// create interface for the props, I need to pass the props to the component goalPage
// I will use this interface to pass the props to the component
// i need name of the goal, goal value, acquired value, months to goal, and max width

export default async function GoalPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug);
  const goal = await getInvestmentGoal(params.slug);
  console.log(goal);

  return (
    <>
      <LoggedHeader showBackButton={true} content="Goal" />
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px', mb: '10px' }}>
          {goal?.goalName}
        </Typography>
      </Box>
      <Box sx={{ padding: '25px' }}>
        <BasicLineChart
          xAxisData={[2023, 2024]}
          seriesData={[0, parseInt(goal?.acquiredValue!)]}
          width={400}
          height={300}
          xAxisMin={2023}
          xAxisMax={2040}
          yAxisMin={0}
          yAxisMax={parseInt(goal?.goalValue!)}
        />
      </Box>
    </>
  );
}