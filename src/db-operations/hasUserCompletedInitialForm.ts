import { UserIsInDbDTO } from '@/dbDTOs/user';
import prismaClient from '@/adapters/prisma';

export default async function hasUserCompletedInitialForm(
  user: UserIsInDbDTO,
): Promise<boolean> {
  try {
    const userFromDb = await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    });
    //null forgiving operator as this DB check should always be called when we are sure that this
    //user record is already existing in DB :)
    return userFromDb!.registrationFormFilled;
  } catch (e) {
    console.log(e);
    return false;
  }
}
