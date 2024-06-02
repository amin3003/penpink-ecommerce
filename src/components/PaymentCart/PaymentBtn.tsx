import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const PaymentBtn = (props: {
  url: any;
  disabled: boolean;
  text: string;
  className:string;
}) => {
  return (
		<button
			className={clsx(
				props.className,
				`btn w-full text-white mt-3`,
				props.disabled ? 'btn-disabled' : null
			)}
		>
			<Link href={props.url}>{props.text}</Link>
		</button>
	);
};
