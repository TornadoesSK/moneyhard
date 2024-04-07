import prismaClient from '@/adapters/prisma';

export default async function getInvestmentGoal(goalId: string) {
  return await prismaClient.investment.findUnique({
    where: {
      id: goalId,
    },
  });
}
