import { Box } from '@mui/material';
import GoalRectangle from '@/components/GoalRectangle';

export default function GoalPage() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <GoalRectangle
        goalName={'GoalName'}
        goalValue={4900}
        acquiredValue={-102}
        monthsToGoal={10}
        maxWidth={220}
      />
    </Box>
  );
}
