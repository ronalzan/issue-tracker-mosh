export { auth as middleware } from '@/auth'

//if you do not add on any extra authentication logic to the middleware such as rewriting or redirecting or direct response to a request,
//middleware will default refer to the logic/rule set by the callback property that is set in the auth.ts which is the place you
//determine the behaviour of authjs library.

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',

      //'/issues/new', //to match on one specific route only, therefore the middleware code will run for this route only.
    ],
  }