import { Box } from '@mui/material';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';
import prismaClient from '@/adapters/prisma';
import { get } from 'http';
import { getSession } from '@auth0/nextjs-auth0';
import { InvestmentDTO } from '@/dbDTOs/investment';
import getInvestmentGoal from '@/db-operations/getInvestmentGoal';

// create interface for the props, I need to pass the props to the component goalPage
// I will use this interface to pass the props to the component
// i need name of the goal, goal value, acquired value, months to goal, and max width

interface GoalPageProps {
  goalId: string;
}

export default async function GoalPage( { goalId }: GoalPageProps) {
  const  session  = await getSession();
  const invdto :InvestmentDTO = {
    userId: session?.user.email,
    goalName: goalId,
  }
  const goal = getInvestmentGoal(invdto);
  

  return (
    <>
      <LoggedHeader showBackButton={true} content="Goal" />
      <Box sx={{ padding: '25px' }}>
        
      </Box>
      <Box sx={{ padding: '25px' }}>
        <GoalRectangle
          goalName={'GoalName'}
          goalValue={4900}
          acquiredValue={-102}
          monthsToGoal={10}
          maxWidth={220}
        />
      </Box>
    </>
  );
}
