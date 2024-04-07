"use client";
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; inProfit: boolean },
) {
  const { inProfit, ...rest } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color={inProfit ? 'success' : 'error'}
          {...rest}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  goalName: string;
  acquiredValue: number;
  goalValue: number;
  monthsToGoal: string;
  maxWidth?: number;
}

export default function GoalRectangle({
  goalName,
  acquiredValue,
  goalValue,
  monthsToGoal,
  maxWidth,
}: Props) {
  return (
    <Card
      sx={{
        maxWidth: typeof maxWidth === 'number' ? maxWidth : '100%',
        minWidth: 200,
        borderRadius: 4,
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: '18px', fontWeight: 500 }}
          color="text.secondary"
          gutterBottom
        >
          {goalName}
        </Typography>
        <LinearProgressWithLabel
          value={Math.round((acquiredValue / goalValue) * 100)}
          inProfit={acquiredValue >= 0}
        />
        <Typography variant="body2" color="text.secondary">
          {acquiredValue} € / {goalValue} €
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ marginLeft: '10px' }}
        >
          {monthsToGoal} left
        </Typography>
      </CardActions>
    </Card>
  );
}
