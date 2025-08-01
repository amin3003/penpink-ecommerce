// pages/index.tsx
import React from 'react';
import ScrollDetector from './ScrollDetector';
import { useTranslations } from 'next-intl';
import Link from '@/navigation';
import AppLogo from './AppLogo';
import clsx from 'clsx';
import BasketIcon from '../Basket/BasketIcon';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';
import { Category, Product } from '@codespase/core';
import ProfileButton from '../Login/ProfileButton';
import { CustomPageHeader } from './CustomPageHeader';

const aboveHeaderItems: string[][] = [
	['پروفایل من', 'profile'],
	['رهگیری سفارش', 'order'],
	['راهنمایی', 'help'],
];
export async function AppHeader() {
	/**
	 * we cant pass classes to client components
	 * so use the get_basicList function
	 */
	const categories = await Category.get_basicList({});

	return (
		<>
			<div className="hidden md:flex pb-5 first-box w-full h-10 bg-transparent" dir="rtl">
				<ul className="flex flex-row rounded-box gap-1 md:gap-2 lg:gap-3 text-[0.65em]">
					{aboveHeaderItems.map((v, i) => (
						<Link key={i} href={v[1]}>
							<li className="mr-2 mt-2 p-2 w-max">
								<b className="w-max text-[10px]">{v[0]}</b>
							</li>
						</Link>
					))}
				</ul>
			</div>

			<header
				className={clsx(
					'header-data sticky top-0 flex gap-2',
					'transition-all duration-1000',
					'data-[is-going-down=true]:top-[-4.1rem]',
					'data-[is-going-down=false]:top-[-1px]',
					'w-full z-30 flex flex-col '
				)}
			>
				<ScrollDetector />
				<nav className="container mx-auto bg-white md:rounded-lg shadow-md">
					<nav className={clsx('header-data navbar max-h-16 w-full', 'top-0')}>
						<div className="container mx-auto flex-row flex">
							<div className="flex flex-row order-10 lg:order-1">
								<ProfileButton />
								<BasketIcon />
							</div>
							<div className="order-2">
								<div className="flex lg:hidden">
									<label
										htmlFor="my-drawer"
										aria-label="open sidebar"
										className="btn btn-square btn-ghost"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											className="inline-block w-6 h-6 stroke-current"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 6h16M4 12h16M4 18h16"
											></path>
										</svg>
									</label>
								</div>
								<div className="flex lg:hidden"></div>
							</div>

							<div className={clsx('z-[31] lg:px-5 md:px-3 px-1 flex-1 order-3')}>
								<HeaderDropdown categories={categories} />
							</div>
							<AppLogo
								logo={true}
								color={'f2bed1'}
								className="justify-end p-3 md:justify-center order-last"
							/>
						</div>
					</nav>
					{/* <nav
						className={clsx(
							'header-data navbar h-[3rem] min-h-[3rem] w-full',
							'bottom-0',
							''
						)}
					>
						<CustomPageHeader />
					</nav> */}
				</nav>
			</header>
		</>
	);
}

export default AppHeader;
