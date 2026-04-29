import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";


export default function proxy(request) {
  return createMiddleware(routing)(request);
}



export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|panel|log-in).*)'],
};
