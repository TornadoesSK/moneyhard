import prismaClient from '../adapters/prisma';
import { UserAfterRegistrationDTO } from '@/dbDTOs/user';
import { Gender } from '@prisma/client';

export default async function addUserAfterRegistration(
  user: UserAfterRegistrationDTO,
): Promise<boolean> {
  try {
    await prismaClient.user.create({
      data: {
        email: user.email,
        name: user.nickname,
        gender: Gender.M,
        income: 0,
        conversationStyle: 'formal',
        context: null,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
