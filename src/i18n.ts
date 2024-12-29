import { getRequestConfig } from 'next-intl/server';
const LOCALE = 'fa';

export default getRequestConfig(async () => ({
	messages: (await import(`../messages/${LOCALE}.json`)).default,
	locale: LOCALE,
	// messages: (
	// 	await (locale === 'en'
	// 		? // When using Turbopack, this will enable HMR for `en`
	// 		  import('../messages/en.json')
	// 		: import(`../messages/${locale}.json`))
	// ).default,
}));
