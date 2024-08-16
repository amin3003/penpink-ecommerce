import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import Link from '@/navigation';
import DBImage from '@/components/Image/DBImage';
import { object_isEmpty } from '@azrico/object';
import { string_to_color } from '@azrico/string';

export default function VariationSelector(props: {
	product: Product;
	variation: ProductVariation;
}) {
	const { product, variation } = props;
	const variation_list = product.variations;

	return (
		<div className="flex flex-col gap-4">
			<p className="text-start text-xs opacity-75" dir="auto">
				<span>{`${variation_list.length} رنگ موجود است`}</span>
				<span>{` `}</span>
				{variation_list.length > 1 && (
					<span>{'رنگ مورد نظر خود را انتخواب کنید' + ' : '}</span>
				)}
			</p>
			<ul className="flex flex-row flex-wrap gap-2">
				{variation_list.map((r, i) => {
					const isActive = ProductVariation.equals(r, variation);
					const link = `?color=${r.getVariationData('color') || ''}&brand=${
						r.getVariationData('brand') || ''
					}`;
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
										style={{ background: string_to_color(r.getVariationData('color')) }}
										className={clsx(
											'size-[32px] rounded-full',
											isActive && 'border-primary border-4'
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
