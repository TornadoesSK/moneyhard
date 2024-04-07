'use server';

import prismaClient from '@/adapters/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { Gender, RelationshipStatus } from '@prisma/client';

export async function setBasicUserData(data: any) {
  const session = await getSession();
  if (session == null) {
    console.log('Cant update');
    return;
  }
  const email = session.user.email;

  prismaClient.user
    .update({
      where: { email: email },
      data: {
        income: Number(data.income),
        name: data.name,
        gender: data.gender === 'F' ? Gender.F : Gender.M,
        context: {
          set: {
            age: Number(data.age),
          },
        },
      },
    })
    .then(r => console.log(r));
}

export async function setAdditionalData(data: any) {
  const session = await getSession();
  if (session == null) {
    console.log('Cant update');
    return;
  }
  const email = session.user.email;

  prismaClient.user
    .update({
      where: { email: email },
      data: {
        context: {
          set: {
            hardExpenses: Number(data.monthlyExpenses),
            occupation: data.job,
            relationshipStatus:
              data['marriage-status'] === 'married'
                ? RelationshipStatus.married
                : RelationshipStatus.single,
          },
        },
      },
    })
    .then(r => console.log(r));
}

export async function createInvestmentGoal(data: any) {
  const session = await getSession();
  if (session == null) {
    console.log('Cant update');
    return;
  }
  const email = session.user.email;

  // todo pridat try catch - ak by to spadlo, tak vlozit defaultnu hodnotu
  prismaClient.investment
    .create({
      data: {
        id: undefined,
        goalTimeframe: data.goalTimeframe,
        userId: email,
        riskLevel: data.riskLevel,
        goalValue: String(data.goalValue),
        investmentAmount: data.investmentAmount,
        investmentValue: data.investmentValue,
        investmentType: 'monthly', // enum
        investmentDuration: data.investmentDuration,
        investmentGoal: data.investmentGoal, // enum - retirement, savings, education
        investmentStyle: data.investmentStyle, // style - aggressive, moderate, conservative
        investmentStrategy: data.investmentStrategy, // strategy - growth, income, index
        investmentAdvice: data.investmentAdvice,
        investmentRecommendation: data.investmentRecommendation,
        investmentAllocation: data.investmentAllocation, // json value
      },
    })
    .then(r => console.log(r));
}
