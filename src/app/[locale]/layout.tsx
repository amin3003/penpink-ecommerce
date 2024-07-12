import React from 'react';
import { notFound } from 'next/navigation';
import { locales } from '@/i18nConfig';
import SidebarContent from '@/components/Sidebar/Sidebar';
import clsx from 'clsx';
import { getServerPathname } from '@/navigation';
import { Footer } from '@/components/Header/Footer';
import { DBManager, ServerApi } from '@azrico/nodeserver';
import { Shape } from '@/components/Shape/Shape';
import { Category } from '@codespase/core';

// const Footer = React.lazy(() => import('@c/Footer/Footer'));
const AppHeader = React.lazy(() => import('@c/Header/AppHeader'));

async function init() {
	ServerApi.init();
	await DBManager.tryToConnect(false);
	await DBManager.get_client();
}
export default async function LocaleLayout(props: any, data: any) {
	// Validate that the incoming `locale` parameter is valid
	// if (!locales.includes(props.params.locale as any)) notFound();

	await init();

	//admin ui and the rest of the website have different headers and main layout
	const pathname = getServerPathname();
	const isAdmin = pathname.startsWith('admin');

	return (
		<html lang={props.params.locale} data-theme="dracula" className="overflow-x-clip">
			<title>penpink | فروشگاه لوازم التحریر</title>
			<head>
				<link rel="icon" href="images/favicon.ico" sizes="any" />
			</head>
			<body id="doc-body" className="overflow-x-clip">
				{isAdmin ? (
					<>
						<main>{props.children}</main>
					</>
				) : (
					<>
						<main className="drawer z-10 flex flex-col" dir="rtl">
							<Shape />
							<AppHeader />
							<input id="my-drawer" type="checkbox" className="drawer-toggle" />

							<div
								className={clsx(
									'drawer-content flex flex-col overflow-hidde',
									'container mx-auto z-0'
								)}
							>
								{props.children}
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
						<Footer />
					</>
				)}
			</body>
		</html>
	);
}
