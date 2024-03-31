// pages/index.tsx
import React from 'react';
import ScrollDetector from './ScrollDetector';
import { useTranslations } from 'next-intl';
import Link from '@/navigation';
import AppLogo from './AppLogo';
import LoginButton from '@c/Login/LoginButton';
import clsx from 'clsx';
import Basket from '../Basket/Basket';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import HeaderDropdownContent from '../HeaderDropdown/HeaderDropdown';
import { Category } from '@codespase/core';
 

const header: string[] = [
  'پروفایل من',
  'به ما بپیوندید ',
  'رهگیری سفارش',
  'راهنمایی',
];

const Home: React.FC<{ data: any }> = ({ data }) => {
  const intl = useTranslations();

  return (
		<>
			<div className="pb-5 first-box w-full h-10 bg-transparent" dir="rtl">
				<ul className="flex flex-row rounded-box gap-1 md:gap-2 lg:gap-3 text-[0.5rem]">
					{header.map((v, i) => (
						<Link key={i} href={`#${v}`}>
							<li className="mr-2 mt-2 p-2">
								<b>{v}</b>
							</li>
						</Link>
					))}
				</ul>
			</div>

			<header
				id="header"
				className={clsx(
					'transition-all duration-1000 delay-0',
					'data-[is-top=false]:bg-primary bg-transparent',
					'navbar sticky justify-between',
					'data-[is-going-down=true]:top-[-100%]',
					'data-[is-going-down=false]:top-0',
					'w-full data-[is-top=false]:shadow-md'
				)}
				dir="rtl" // Set text direction to RTL
			>
				<ScrollDetector />

				<React.Suspense fallback={null}>
					<div className="flex-1 lg:flex-none">
						<div className="flex-none lg:hidden">
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
						<div className="flex-1 lg:hidden"></div>
						<AppLogo logo className="justify-end p-3" />
					</div>

					<div
						className={clsx(
							'navbar-center relative justify-between items-center w-full',
							'hidden lg:flex lg:w-auto '
						)}
					>
						<HeaderDropdownContent />
					</div>
					<div className="flex flex-row">
						<LoginButton />
						<Basket />
					</div>
				</React.Suspense>
			</header>
		</>
	);
};

export default Home;
