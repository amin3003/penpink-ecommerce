import React from 'react';
import { notFound } from 'next/navigation';
import { locales } from '@/i18nConfig'; 
 
 

export default function LocaleLayout({ children, params: { locale } }: any) {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	return (
		<html lang={locale} data-theme="dracula" className="overflow-x-clip">
			<title>Pinkshop</title>
			<body id="doc-body" className="overflow-x-clip">
				<main>Pinkshop</main>
			</body>
		</html>
	);
}
