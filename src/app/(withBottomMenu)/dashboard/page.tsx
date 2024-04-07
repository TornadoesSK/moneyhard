import Carousel from '@/components/Carousel';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';
import { Box, Typography } from '@mui/material';

interface GoalRectangleValues {
  goalName: string;
  acquiredValue: number;
  goalValue: number;
  monthsToGoal: number;
}

export default async function Dashboard() {
  const goalRectangleValues: GoalRectangleValues[] = [
    {
      goalName: 'Retirement',
      acquiredValue: 27899,
      goalValue: 45000,
      monthsToGoal: 73,
    },
    {
      goalName: 'Family trip',
      acquiredValue: -988,
      goalValue: 2400,
      monthsToGoal: 7,
    },
    {
      goalName: 'New car',
      acquiredValue: 2822,
      goalValue: 13000,
      monthsToGoal: 27,
    },
  ];
  return (
    <>
      <LoggedHeader showBackButton={false} content="balance" />
      <Box sx={{ padding: '25px' }}>
        <Typography variant="h3" component="h1">
          Your goals
        </Typography>
        <Carousel>
          {goalRectangleValues.map(glv => (
            <GoalRectangle
              key={glv.goalName}
              goalName={glv.goalName}
              acquiredValue={glv.acquiredValue}
              goalValue={glv.goalValue}
              monthsToGoal={glv.monthsToGoal}
            />
          ))}
        </Carousel>
      </Box>
    </>
  );
}
