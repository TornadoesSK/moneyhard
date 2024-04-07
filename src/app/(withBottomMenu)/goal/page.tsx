import { Box, Typography } from '@mui/material';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';
import prismaClient from '@/adapters/prisma';
import { get } from 'http';
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
