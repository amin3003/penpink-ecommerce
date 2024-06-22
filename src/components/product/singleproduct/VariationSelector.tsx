import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import Link from '@/navigation';
import DBImage from '@/components/Image/DBImage';
import { object_isEmpty } from '@azrico/object';

const colorclasses = ['bg-red-200', 'bg-green-200', 'bg-cyan-200', 'bg-gray-200'];
export default function VariationSelector(props: {
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
					const isActive = ProductVariation.equals(r, variation);
					const link = `?color=${r.getVariationData('color')}&brand=${r.getVariationData(
						'brand'
					)}`;
					const hasImage = !object_isEmpty(r.images);
					return (
						<li key={r.getID()}>
							<Link href={link}>
								{hasImage ? (
									<DBImage
										className={clsx(
											'size-[32px] rounded-full',
											isActive && 'border-primary border-4'
										)}
										src={r.images ?? ''}
										height={32}
										width={32}
									/>
								) : (
									<div
										className={clsx(
											'size-[32px] rounded-full',
											isActive && 'border-primary border-4',
											colorclasses[i % colorclasses.length]
										)}
									></div>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
