import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, localePrefix } from '../i18nConfig';

import { DBManager } from '@azrico/nodeserver';
import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFunction, isPathAllowed, reservedPaths } from './stackHandler';

const langMiddleware: MiddlewareFunction = (request: NextRequest, res) => {
	const handleI18nRouting = createIntlMiddleware({
		localePrefix: 'as-needed',
		locales: locales,
		defaultLocale: defaultLocale,
	});

	const response = handleI18nRouting(request as any);
	/* ----------------------------- custom headers ----------------------------- */

	return response;
};
const factory = { middleware: langMiddleware };
export default factory;
