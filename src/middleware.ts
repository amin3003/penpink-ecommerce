import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18nConfig';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
	const handleI18nRouting = createIntlMiddleware({
		locales: locales,
		defaultLocale: defaultLocale,
	});
	const response = handleI18nRouting(request);

	/* ----------------------------- custom headers ----------------------------- */
	response.headers.set('x-url', request.url);
	response.headers.set('x-path', request.nextUrl.pathname);

	return response;
}

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		'/',

		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		'/(en|tr)/:path*',

		// Enable redirects that add missing localesw
		// (e.g. `/pathnames` -> `/en/pathnames`)
		'/((?!_next|api|_vercel|.*\\..*).*)',
	],
};
