import prismaClient from '../adapters/prisma';
import { InvestmentDTO } from '@/dbDTOs/investment';

export default async function addUserInvestment(
  investment: InvestmentDTO,
): Promise<boolean> {
  try {
    await prismaClient.investment.create({
      data: investment,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
