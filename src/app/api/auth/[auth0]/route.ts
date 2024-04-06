import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import userIsInDbCheck from '@/db-operations/userIsInDbCheck';
import addUserAfterRegistration from '@/db-operations/addUserAfterRegistration';

const afterCallback = async (req: NextRequest, session: any, state: any) => {
  if (session.accessToken.length !== 0) {
    const userAlreadyInDb = await userIsInDbCheck({
      email: session.user.email,
    });
    if (!userAlreadyInDb) {
      const successfullyAdded = await addUserAfterRegistration({
        email: session.user.email,
        nickname: session.user.nickname,
      });
      console.log(successfullyAdded);
    }
    console.log(userAlreadyInDb);
    return session;
  } else {
    redirect('/unauthorized');
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
