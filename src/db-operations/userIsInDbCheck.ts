import prismaClient from '../adapters/prisma';
import { UserIsInDbDTO } from '@/dbDTOs/user';

export default async function userIsInDbCheck(
  user: UserIsInDbDTO,
): Promise<boolean> {
  try {
    const userFromDb = await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return userFromDb !== null;
  } catch (e) {
    console.log(e);
    return false;
  }
}
