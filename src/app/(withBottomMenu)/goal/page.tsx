import { Box, Typography } from '@mui/material';
import LoggedHeader from '@/components/LoggedHeader';
import { getSession } from '@auth0/nextjs-auth0';
import { InvestmentDefinedDTO } from '@/dbDTOs/investment';
import getInvestmentGoal from '@/db-operations/getInvestmentGoal';
import BasicLineChart from '@/components/charts/BasicLineChart';

// create interface for the props, I need to pass the props to the component goalPage
// I will use this interface to pass the props to the component
// i need name of the goal, goal value, acquired value, months to goal, and max width

interface GoalPageProps {
  goalId: string;
}

export default async function GoalPage({ goalId }: GoalPageProps) {
  const session = await getSession();
  const invdto: InvestmentDefinedDTO = {
    userId: session?.user.email,
    goalName: goalId,
  };
  const goal = await getInvestmentGoal(invdto);

  return (
    <>
      <LoggedHeader showBackButton={true} content="Goal" />
      <Box sx={{ padding: '25px' }}>
        <Box>
          <Typography component="h2" sx={{ fontSize: '20px' }}>
            {goal?.goalName}
          </Typography>
        </Box>
        <Box>
          <BasicLineChart
            xAxisData={[2023, 2024]}
            seriesData={[0, parseInt(goal?.acquiredValue!)]}
            height={300}
            xAxisMin={2023}
            xAxisMax={2040}
            yAxisMin={0}
            yAxisMax={parseInt(goal?.goalValue!)}
          />
        </Box>
      </Box>
    </>
  );
}
