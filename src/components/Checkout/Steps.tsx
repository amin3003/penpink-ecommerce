import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { checkoutPaths } from '../CartSidebar/CartSidebar';
import { getServerPathname } from '@/navigation';
import { custom_trim, url_matches } from '@azrico/string';

export const Steps = () => {
	const serverPathname = getServerPathname();
	const steps = [];
	/**
	 * find the last step that is checked and check every step behind it
	 */
	const lastChecked = checkoutPaths.findLastIndex((s) =>
		url_matches(serverPathname, s.url)
	);
	for (let index = 0; index < checkoutPaths.length; index++) {
		const r = checkoutPaths[index];
		steps.push({
			...r,
			active: Boolean(index <= lastChecked),
		});
	}

	return (
		<ul className="steps my-4 mx-3">
			{steps.map((item: any, index) => (
				<li
					key={index}
					className={clsx(`text-[12px] md:text-md step`, item.active && 'step-primary')}
				>
					<Link href={`/${custom_trim(item.url, '/')}`}>{item.text}</Link>
				</li>
			))}
		</ul>
	);
};
