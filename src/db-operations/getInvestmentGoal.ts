import { InvestmentDTO } from "@/dbDTOs/investment";
import prismaClient from "@/adapters/prisma";

export default async function getInvestmentGoal(goal: InvestmentDTO) {
    return await prismaClient.investment.findUnique({
        where: {
          userId: goal.userId,
          goalName: goal.goalName,
        },
      });

}