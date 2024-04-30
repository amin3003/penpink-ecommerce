// import { header_paths } from '@c/Header/AppHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
// import LangSwitcher from '@c/Header/LangSwitcher';
import { Link, getServerPathname } from '@src/navigation';

import { SidebarController } from './SidebarController';
import { Category } from '@codespase/core';
export default async function SidebarContent() {
	const categories = await Category.get_list({});

	return (
		<div className="p-4 min-h-full !w-[75%] bg-base-200 flex flex-col">
			<SidebarController />
			<section className="flex flex-row flex-1">
				<ul className="menu flex-1">
					{categories.map((v, i) => {
						return (
							<li key={i} className="text-md">
								<Link href={`#${v}`}></Link>
							</li>
						);
					})}
				</ul>
				<button id="btn-close-sidebar" className="btn btn-sm btn-ghost btn-circle">
					<Image
						style={{ maxWidth: '70%' }}
						src={`/images/close.svg`}
						width={200}
						height={200}
						alt="contact"
					/>
				</button>
			</section>

			<ul className="menu">{/* <LangSwitcher openUp className="navbar-end" /> */}</ul>
		</div>
	);
}
