import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/dashboard', '/dashboard/admin', '/dashboard/user'];
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
