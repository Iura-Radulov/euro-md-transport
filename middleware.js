import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
//
// function isPanelRoute(pathname) {
//   if (pathname === '/panel' || pathname.startsWith('/panel/')) return true;
//   if (routing && Array.isArray(routing.locales)) {
//     for (const locale of routing.locales) {
//       if (pathname === `/${locale}/panel` || pathname.startsWith(`/${locale}/panel/`)) return true;
//     }
//   }
//   return false;
// }
//
// function isLoginRoute(pathname) {
//   if (pathname === '/log-in' || pathname.startsWith('/log-in/')) return true;
//   if (routing && Array.isArray(routing.locales)) {
//     for (const locale of routing.locales) {
//       if (pathname === `/${locale}/log-in` || pathname.startsWith(`/${locale}/log-in/`)) return true;
//     }
//   }
//   return false;
// }
//
// function stripLocalePrefix(pathname) {
//   // Remove locale prefix if present (e.g., /ro/panel -> /panel)
//   if (!routing || !Array.isArray(routing.locales)) return pathname;
//   for (const locale of routing.locales) {
//     if (pathname === `/${locale}`) return '/';
//     if (pathname.startsWith(`/${locale}/`)) return pathname.replace(`/${locale}`, '');
//   }
//   return pathname;
// }
//
// export async function middleware(request) {
//   const { pathname } = request.nextUrl;
//
//   // Debug logging
//   console.log('[middleware] incoming request:', pathname);
//   try {
//     console.log('[middleware] nextUrl href:', String(request.nextUrl.href));
//     console.log('[middleware] nextUrl pathname type:', typeof request.nextUrl.pathname, 'value:', request.nextUrl.pathname);
//     console.log('[middleware] nextUrl searchParams:', Object.fromEntries(request.nextUrl.searchParams.entries()));
//   } catch (e) {
//     console.log('[middleware] error reading nextUrl details:', e);
//   }
//
//   // Defensive: if pathname stringifies an object, normalize it to '/'
//   if (String(pathname) === '[object Object]' || pathname === '/[object Object]') {
//     console.warn('[middleware] detected malformed pathname, normalizing to "/" to avoid rewrite loops');
//     const url = request.nextUrl.clone();
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }
//
//   // If the request was already rewritten by next-intl to a locale-prefixed login path
//   // (e.g. /ro/log-in), redirect back to the root login URL (no locale) and normalize
//   // callbackUrl so users always land on http://localhost:3000/log-in
//   const unprefixed = stripLocalePrefix(pathname);
//   if (unprefixed === '/log-in' && pathname !== '/log-in') {
//     console.log('[middleware] normalized login detected, redirecting to root login (no locale)');
//     const signInUrl = new URL('/log-in', request.nextUrl.origin);
//     const cb = request.nextUrl.searchParams.get('callbackUrl');
//     if (cb) {
//       signInUrl.searchParams.set('callbackUrl', stripLocalePrefix(cb));
//     }
//     return NextResponse.redirect(signInUrl);
//   }
//
//   // If this is specifically the login page, allow it (skip i18n) so it is served at /log-in
//   // and not rewritten by next-intl to a locale-prefixed path like /ro/log-in.
//   if (isLoginRoute(pathname)) {
//     console.log('[middleware] login route requested; allowing without i18n rewrite');
//     return undefined;
//   }
//
//   // If this is a panel (admin) route, skip i18n redirects and enforce auth directly.
//   // This ensures /panel does NOT get redirected to /ru/panel etc.
//   if (isPanelRoute(pathname)) {
//     try {
//       const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//       console.log('[middleware] isPanelRoute, token found:', !!token);
//       if (!token) {
//         // If user is already on the login page, don't redirect to avoid loop
//         if (isLoginRoute(pathname)) {
//           console.log('[middleware] request is login page; allow without redirect');
//           return undefined;
//         }
//
//         // Force redirect to origin /log-in (no locale) and strip locale from callback
//         const signInUrl = new URL('/log-in', request.nextUrl.origin);
//         const hasCallback = request.nextUrl.searchParams.has('callbackUrl');
//         if (!hasCallback) {
//           const callback = stripLocalePrefix(request.nextUrl.pathname);
//           signInUrl.searchParams.set('callbackUrl', callback);
//         }
//         console.log('[middleware] redirecting to sign-in:', signInUrl.href);
//         return NextResponse.redirect(signInUrl);
//       }
//       // authenticated - allow request
//       return undefined;
//     } catch (e) {
//       console.error('[middleware] getToken error:', e);
//       if (isLoginRoute(pathname)) return undefined;
//       const signInUrl = new URL('/log-in', request.nextUrl.origin);
//       const hasCallback = request.nextUrl.searchParams.has('callbackUrl');
//       if (!hasCallback) {
//         const callback = stripLocalePrefix(request.nextUrl.pathname);
//         signInUrl.searchParams.set('callbackUrl', callback);
//       }
//       return NextResponse.redirect(signInUrl);
//     }
//   }
//
//   // Not a panel or login route: run next-intl middleware to handle locale redirects
//   const i18nResponse = await createMiddleware(routing)(request);
//   if (i18nResponse) {
//     console.log('[middleware] next-intl returned a response, returning it.');
//     return i18nResponse;
//   }
//
//   // For all other routes, do nothing
//   return undefined;
// }
//
// export const config = {
//   // Exclude login and .well-known from middleware processing to avoid i18n rewriting them.
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|public|log-in|\.well-known).*)'],
// };


export default function middleware(request) {
  return createMiddleware(routing)(request);
}



export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|assets|panel|log-in).*)'],
};
