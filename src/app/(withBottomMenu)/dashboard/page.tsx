import Carousel from '@/components/Carousel';
import GoalRectangle from '@/components/GoalRectangle';
import LoggedHeader from '@/components/LoggedHeader';
import BasicPie from '@/components/charts/PieChart';
import { Box, Typography } from '@mui/material';
import NewGoalRectangle from '@/components/NewGoalRectangle';
import getUserInvestments from '@/db-operations/getUserInvestments';
import { getSession } from '@auth0/nextjs-auth0';
import { getInvestments } from '@/service/mongoService';
import SingleRow from '@/components/SingleRow';
import { createFinancialTip } from '@/service/openaiService';

export default async function Dashboard() {
  const session = await getSession();
  let investments = await getUserInvestments({ email: session!.user.email });
  const data = await getInvestments();

  const calculateTotalAmounts = (data: any) => {
    let stocks = 0;
    let bonds = 0;
    let cash = 0;

    // todo, tu dat nieco ako ze investedAmount
    data.forEach((investment: any) => {
      let goalValue = Number(investment.acquiredValue);
      investment.investmentAllocation.forEach((item: any) => {
        if (item.type.trim() == 'stocks') {
          stocks += Number((item.percentage / 100) * goalValue);
        } else if (item.type.trim() == 'bonds') {
          bonds += Number((item.percentage / 100) * goalValue);
        } else {
          cash += Number((item.percentage / 100) * goalValue);
        }
      });
    });
    let finalArray = [];
    finalArray.push({ type: 'Stocks', amount: `${stocks} €`, number: stocks });
    finalArray.push({ type: 'Bonds', amount: `${bonds} €`, number: bonds });
    finalArray.push({ type: 'Cash', amount: `${cash} €`, number: cash });

    return finalArray;
  };

  function getTotalBalance() {
    const dataArray = calculateTotalAmounts(data)
    let sum = 0
    dataArray.forEach((item) => {
      sum += item.number
    })

    return sum ?? 0
  }

  return (
    <>
      <LoggedHeader showBackButton={false} content="balance" balance={getTotalBalance()} />
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px', mb: '25px' }}>
          Recommended budget
        </Typography>
        <BasicPie />
      </Box>
      {data && (
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
            }}
          >
            {calculateTotalAmounts(data).map((item, index) => (
              <SingleRow
                key={item.type}
                leftText={item.type}
                rightText={String(item.amount)}
                navigateTo={item.type}
              />
            ))}
          </Box>
        </Box>
      )}
      <Box sx={{ padding: '25px' }}>
        <Typography component="h2" sx={{ fontSize: '20px', mb: '10px' }}>
          Your goals
        </Typography>
        <Typography variant="caption" component="p" sx={{ mb: '10px' }}>
          {await createFinancialTip()}
        </Typography>
        <Carousel>
          {data &&
            data.map((item, idx) => (
              <GoalRectangle
                key={item.goalName}
                goalId={item.id}
                goalName={item.goalName}
                acquiredValue={Number(item.acquiredValue)}
                goalValue={Number(item.goalValue)}
                monthsToGoal={item.goalTimeframe}
              />
            ))}
        </Carousel>
        <NewGoalRectangle userId={session!.user.email} />
      </Box>
    </>
  );
}
