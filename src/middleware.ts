import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

export default function middleware(req : NextRequest, event: NextFetchEvent) {
    const {pathname} = req.nextUrl;
    const publicPaths = ['/'];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    return withMiddlewareAuthRequired()(req, event);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.ico|.*\\.jpg$).*)']
};