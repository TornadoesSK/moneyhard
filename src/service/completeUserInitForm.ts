'use server';

import { getSession } from '@auth0/nextjs-auth0';
import completeUserInitialForm from '@/db-operations/completeUserInitialForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function completeUserInitForm() {
  const session = await getSession();

  await completeUserInitialForm({ email: session!.user!.email! });
  cookies().delete('initialFormFilled');
  redirect('/dashboard');
}
