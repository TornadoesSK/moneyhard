import prismaClient from '../adapters/prisma';
import { UserIsInDbDTO } from '@/dbDTOs/user';
import { InvestmentDTO } from '@/dbDTOs/investment';

export default async function getUserInvestments(
  user: UserIsInDbDTO,
): Promise<InvestmentDTO[]> {
  try {
    return (await prismaClient.investment.findMany({
      where: { userId: user.email },
    })) as InvestmentDTO[];
  } catch (e) {
    console.log(e);
    return [];
  }
}
