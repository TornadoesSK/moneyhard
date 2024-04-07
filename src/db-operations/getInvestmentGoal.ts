import { InvestmentDefinedDTO } from "@/dbDTOs/investment";
import prismaClient from "@/adapters/prisma";

export default async function getInvestmentGoal(goal: InvestmentDefinedDTO) {
    return await prismaClient.investment.findFirst({
        where: {
          userId: goal.userId,
          goalName: goal.goalName,
        },
      });
}