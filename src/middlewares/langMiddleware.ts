import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '../i18nConfig';
import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareFunction } from './stackHandler';

const langMiddleware: MiddlewareFunction = (request: NextRequest, res: NextResponse) => {
	const handleI18nRouting = createIntlMiddleware({
		localePrefix: 'as-needed',
		locales: locales,
		defaultLocale: defaultLocale,
	});

	const response = handleI18nRouting(request as any);
	/* ----------------------------- custom headers ----------------------------- */

	return response as unknown as NextResponse;
};
const factory = { middleware: langMiddleware };
export default factory;
