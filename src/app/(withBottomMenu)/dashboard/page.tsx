import Carousel from '@/components/Carousel';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';
import BasicPie from '@/components/charts/PieChart';
import { Box, Typography } from '@mui/material';
import NewGoalRectangle from '@/components/NewGoalRectangle';
import getUserInvestments from '@/db-operations/getUserInvestments';
import { getSession } from '@auth0/nextjs-auth0';

interface GoalRectangleValues {
  goalName: string;
  acquiredValue: number;
  goalValue: number;
  monthsToGoal: number;
}

export default async function Dashboard() {
  const session = await getSession();
  let investments = await getUserInvestments({ email: session!.user.email });
  return (
    <>
      <LoggedHeader showBackButton={false} content="balance" />
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px', mb: '10px' }}>
          Recommended budget
        </Typography>
        <BasicPie />
      </Box>
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px', mb: '10px' }}>
          Your goals
        </Typography>
        <Carousel>
          {investments.map(inv => (
            <GoalRectangle
              key={inv.goalName}
              goalName={inv.goalName}
              acquiredValue={parseInt(inv.acquiredValue)}
              goalValue={parseInt(inv.goalValue)}
              monthsToGoal={parseInt(inv.months)}
            />
          ))}
        </Carousel>
        <NewGoalRectangle maxWidth={200} userId={session!.user.email} />
      </Box>
    </>
  );
}
