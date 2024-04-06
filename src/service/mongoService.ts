'use server';

import { prismaClient } from '@/adapters/prisma';
import { getSession } from '@auth0/nextjs-auth0';

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
        gender: data.gender,
        context: {
          update: {
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
          update: {
            hardExpenses: Number(data.monthlyExpenses),
            occupation: data.job,
            relationshipStatus: {
              set: data['marriage-status'],
            },
          },
        },
      },
    })
    .then(r => console.log(r));
}
