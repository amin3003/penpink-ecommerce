import React from 'react';
import { notFound } from 'next/navigation';
import { locales } from '@/i18nConfig';
import SidebarContent from '@c/SidebarContent/SidebarContent';
import clsx from 'clsx';
import { getServerPathname } from '@/navigation';

// const Footer = React.lazy(() => import('@c/Footer/Footer'));
const AppHeader = React.lazy(() => import('@c/Header/AppHeader'));

export default function LocaleLayout({ children, params: { locale } }: any) {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	//admin ui and the rest of the website have different headers and main layout
	const pathname = getServerPathname();
	const isAdmin = pathname.startsWith('admin');

	return (
		<html lang={locale} data-theme="dracula" className="overflow-x-clip">
			<title>penpink | فروشگاه لوازم التحریر</title>
			<head>
				<link rel="icon" href="images/favicon.ico" sizes="any" />
			</head>
			<body id="doc-body" className="overflow-x-clip">
				{isAdmin ? (
					<>
						<main>{children}</main>
					</>
				) : (
					<>
						<main className="drawer z-0 flex flex-col">
							<AppHeader />
							<input id="my-drawer" type="checkbox" className="drawer-toggle" />

							<div
								className={clsx(
									'drawer-content flex flex-col overflow-hidde',
									'container mx-auto z-0'
								)}
							>
								{children}
							</div>

							<div className="drawer-side z-[40000]">
								<label
									htmlFor="my-drawer"
									aria-label="close sidebar"
									className="drawer-overlay"
								></label>
								<SidebarContent />
							</div>
						</main>
					</>
				)}

				{/* <Footer /> */}
			</body>
		</html>
	);
}
