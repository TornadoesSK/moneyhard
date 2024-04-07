import { Box } from '@mui/material';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';

export default function GoalPage() {
  return (
    <>
      <LoggedHeader showBackButton={true} content="Goal" />
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
