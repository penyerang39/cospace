import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect /admin/dashboard/* routes
  if (pathname.startsWith('/admin/dashboard')) {
    // Session check will happen at the page level
    // Middleware just handles the route matching
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};


