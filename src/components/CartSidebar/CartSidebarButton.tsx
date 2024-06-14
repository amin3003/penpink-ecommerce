import Link from '@/navigation';
import clsx from 'clsx';
import React from 'react';

export const CartSidebarButton = (props: {
	url: any;
	disabled: boolean;
	text: string;
	className: string;
}) => {
	return (
		<Link href={props.url}>
			<button
				type="button"
				disabled={props.disabled}
				className={clsx(props.className, `btn w-full text-white mt-3`)}
			>
				{props.text}
			</button>
		</Link>
	);
};
