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
			<title>Codespase</title>
			<body id="doc-body" className="overflow-x-clip">
				{isAdmin ? (
					<>
						<main>{children}</main>
					</>
				) : (
					<>
						<AppHeader />
						<main className="drawer">
							<input id="my-drawer" type="checkbox" className="drawer-toggle" />

<<<<<<< HEAD
          <div
            className={clsx(
              'drawer-content flex flex-col overflow-hidde',
              'container mx-auto'
            )}
          >
            {children}
          </div>
=======
							<div
								className={clsx(
									'drawer-content flex flex-col overflow-hidde',
									'w-full container mx-auto'
								)}
							>
								{children}
							</div>
>>>>>>> 1b8946147ea24ff4dee4ab212116b1e0892d7914

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
