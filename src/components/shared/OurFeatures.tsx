import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';
import clsx from 'clsx';

export default function OurFeatures(props: { readyToSend?: boolean }) {
	const features = [
		props.readyToSend ? { icon: 'bi-bag-heart', text: 'اماده ارسال' } : null,
		{ icon: 'bi-brush', text: 'کیفیت عالی' },
		{ icon: 'bi-box', text: 'فرصت 7 روزه بازگشت کالا' },
		{ icon: 'bi-credit-card', text: 'پرداخت امن از درگاه بانکی' },
	];
	return (
		<div className="w-full flex flex-col md:flex-row gap-4 text-xs justify-around">
			{features.map((r, i) => {
				if (r == null) return <></>;
				return (
					<div
						key={i}
						className={clsx(
							'rounded-lg p-2 flex flex-row gap-2 items-center',
							'opacity-90'
						)}
					>
						<i className={clsx('bi text-lg aspect-square', r.icon)}></i>
						<span>{r.text}</span>
					</div>
				);
			})}
		</div>
	);
}
