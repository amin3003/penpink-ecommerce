import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import Link from '@/navigation';

const colorclasses = ['bg-red-200', 'bg-green-200', 'bg-cyan-200', 'bg-gray-200'];
export default function ProductVariationSelector(props: {
	product: Product;
	variation: ProductVariation;
}) {
	const { product, variation } = props;
	const variation_list = product.variations;

	return (
		<div className="flex flex-col gap-4">
			<p className="text-start text-xs opacity-75" dir="auto">
				{'رنگ مورد نظر خود را انتخواب کنید' + ' : '}
			</p>
			<ul className="flex flex-row gap-2">
				{variation_list.map((r, i) => {
					const isActive = r === variation;
					return (
						<li key={i}>
							<Link href={'?variation=' + r.color}>
								<div
									className={clsx(
										'size-[30px] rounded-full',
										isActive && 'border-4',
										colorclasses[i]
									)}
								></div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
