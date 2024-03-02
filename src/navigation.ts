import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './i18nConfig';

export function getServerPathname() {
	const nextHeaders = require('next/headers');
	const headersList = nextHeaders.headers();
	const pathname = String(headersList.get('x-path') || '');
	/* ----------------------- remove locale from pathname ---------------------- */
	const pathnamesp = pathname.split('/').filter((s) => s);
	for (let index = 0; index < locales.length; index++) {
		const loc = locales[index];
		if (pathnamesp[0] === loc) {
			pathnamesp[0] = '';
			break;
		}
	}
	return pathnamesp.filter((s) => s).join('/');
}

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(
	{
		locales: locales,
		localePrefix: localePrefix,
	}
);
export default Link;
