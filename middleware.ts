import { auth } from './app/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  
  // Protect /admin/dashboard/* routes
  if (pathname.startsWith('/admin/dashboard')) {
    if (!isLoggedIn) {
      const signInUrl = new URL('/admin/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return Response.redirect(signInUrl);
    }
  }
  
  return undefined;
});

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};


