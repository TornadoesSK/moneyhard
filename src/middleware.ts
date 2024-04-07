import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const { pathname } = req.nextUrl;
  const publicPaths = ['/'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (
    req.cookies.get('initialFormFilled')?.value === 'false' &&
    !req.nextUrl.pathname.startsWith('/set-up')
  ) {
    return NextResponse.redirect(new URL('/set-up/1', req.url));
  } else if (
    req.cookies.get('initialFormFilled')?.value == null &&
    req.nextUrl.pathname.startsWith('/set-up')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return withMiddlewareAuthRequired()(req, event);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.ico|.*\\.jpg$).*)',
  ],
};
