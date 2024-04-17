import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from '../i18nConfig';

import { DBManager } from '@azrico/nodeserver';
import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory, resrvedPaths } from './stackHandler';

export const langMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		if (resrvedPaths.some((path) => pathname.startsWith(path))) {
			return next(request, _next);
		}

		const handleI18nRouting = createIntlMiddleware({
			localePrefix: 'as-needed',
			locales: locales,
			defaultLocale: defaultLocale,
		});

		const response = handleI18nRouting(request as any);
		/* ----------------------------- custom headers ----------------------------- */
		response.headers.set('x-url', request.url);
		response.headers.set('x-path', request.nextUrl.pathname);

		return response;
	};
};
export default langMiddleware;
