import { createNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './i18nConfig';

export function getServerHost() {
	if (typeof window !== 'undefined') return window.location.origin;
	const nextHeaders = require('next/headers');
	const headersList = nextHeaders.headers();
	return headersList.get('x-forwarded-proto') + '://' + headersList.get('host');
}
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
export function getServerSearchParams() {
	const nextHeaders = require('next/headers');
	const headers = nextHeaders.headers();
	const url = new URL(headers.get('x-url'));
	return url.searchParams;
}

export const { Link, redirect, usePathname, useRouter } = createNavigation({
	locales: locales,
	localePrefix: localePrefix,
});
export default Link;
