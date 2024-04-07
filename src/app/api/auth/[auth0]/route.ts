import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import userIsInDbCheck from '@/db-operations/userIsInDbCheck';
import addUserAfterRegistration from '@/db-operations/addUserAfterRegistration';
import { cookies } from 'next/headers';
import hasUserCompletedInitialForm from '@/db-operations/hasUserCompletedInitialForm';

const afterCallback = async (req: NextRequest, session: any, state: any) => {
  if (session.accessToken.length !== 0) {
    const userAlreadyInDb = await userIsInDbCheck({
      email: session.user.email,
    });
    if (!userAlreadyInDb) {
      await addUserAfterRegistration({
        email: session.user.email,
        nickname: session.user.nickname,
      });
    }
    let hasCompletedInitForm = false;
    if (userAlreadyInDb) {
      hasCompletedInitForm = await hasUserCompletedInitialForm({
        email: session.user.email,
      });
    }
    cookies().set('initialFormFilled', hasCompletedInitForm.toString(), {
      path: '/',
      maxAge: 123456789,
    });

    return session;
  } else {
    redirect('/unauthorized');
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
