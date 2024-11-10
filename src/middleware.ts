import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    if (request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/circle', request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname === '/circle') {
    if (request.cookies.get('user')) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname === '/admin') {
    if (
      JSON.parse(request.cookies.get('user')?.value || '{}').role === 'admin'
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/rank', request.url));
    }
  }

  if (request.nextUrl.pathname === '/rank') {
    if (request.cookies.get('user')) {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/circle', '/admin', '/rank'],
};
