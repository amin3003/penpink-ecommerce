// pages/index.tsx
import React from 'react';
import ScrollDetector from './ScrollDetector';
import { useTranslations } from 'next-intl';
import Link from '@/navigation';
import AppLogo from './AppLogo';
import LoginButton from '@c/Login/LoginButton';
import clsx from 'clsx';
import Basket from '../Basket/Basket';
import HeaderDropdown from './HeaderDropdown/HeaderDropdown';
import HeaderDropdownContent from './HeaderDropdown/HeaderDropdown';
import { Category } from '@codespase/core';

const header: string[] = ['پروفایل من', 'به ما بپیوندید ', 'رهگیری سفارش', 'راهنمایی'];

const Home: React.FC = () => {
	const intl = useTranslations();

	return (
		<>
			<div className="pb-5 first-box w-full h-10 bg-transparent" dir="rtl">
				<ul className="flex flex-row rounded-box gap-1 md:gap-2 lg:gap-3 text-[0.65em]">
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
					'data-[is-top=false]:data-[is-going-down=false]:bg-primary bg-transparent',
					'data-[is-top=false]:data-[is-going-down=false]:shadow-md',
					'navbar sticky justify-between',
					'data-[is-going-down=true]:top-[-100%]',
					'data-[is-going-down=false]:top-0',
					'w-full z-30'
				)}
			>
				<ScrollDetector />
				<div className="container mx-auto flex-row flex">
					<div className="flex flex-row order-10 lg:order-1">
						<LoginButton />
						<Basket />
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
						<HeaderDropdownContent />
					</div>
					<AppLogo logo={true} className="justify-end p-3 md:justify-center order-last" />
				</div>
			</header>
		</>
	);
};

export default Home;
