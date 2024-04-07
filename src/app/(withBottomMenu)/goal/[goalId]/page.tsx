import { Box, Typography } from '@mui/material';
import LoggedHeader from '@/components/LoggedHeader';
import getInvestmentGoal from '@/db-operations/getInvestmentGoal';
import BasicLineChart from '@/components/charts/BasicLineChart';
import { JsonArray } from '@prisma/client/runtime/library';
import SingleRow from '@/components/SingleRow';
import { createAssetTypeHint } from '@/service/openaiService';

// create interface for the props, I need to pass the props to the component goalPage
// I will use this interface to pass the props to the component
// i need name of the goal, goal value, acquired value, months to goal, and max width

interface Allocation {
  type: string;
  percentage: number;
  assetName: string;
}

export default async function GoalPage({
  params,
}: {
  params: { goalId: string };
}) {
  const goal = await getInvestmentGoal(params.goalId);

  return (
    <>
      <LoggedHeader showBackButton={true} content="Goal" />
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px' }}>
          {goal?.goalName}
        </Typography>
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
      {goal?.investmentAllocation && (
        <Box
          sx={{
            px: '25px',
          }}
        >
          <Typography component="h2" sx={{ fontSize: '20px', mb: '10px' }}>
            Investments
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              mb: 2
            }}
          >
            {(goal.investmentAllocation as JsonArray).map((item, index) => (
              <SingleRow
                key={item.assetName}
                leftText={`${item.assetName}`}
                rightText={`${item.percentage}% - ${(Number(goal.acquiredValue) * item.percentage) / 100} €`}
              />
            ))}
          </Box>
          <Typography variant="caption">
            {goal.investmentAllocation.length > 0 &&
              (await createAssetTypeHint(
                goal.investmentAllocation[
                  Math.floor(Math.random() * goal.investmentAllocation.length)
                ].type,
              ))}
          </Typography>
        </Box>
      )}
    </>
  );
}
