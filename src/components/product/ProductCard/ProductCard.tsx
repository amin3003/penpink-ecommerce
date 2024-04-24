import AddToBasketButton from '@/components/Basket/AddToBasketButton';
import DBImage from '@/components/Image/DBImage';
import { Product } from '@codespase/core';
import Link from '@/navigation';

import React from 'react';

/**
 * a single product card. mostly used in sliders
 * @param props
 * @returns
 */
export const ProductCard = (props: { product: Product }) => {
	const pr = props.product;

	//we use the first variation of the product to show its price
	//should we use average price or something else...?
	const first_variation = pr.variations[0];
	if (!first_variation) return <></>;

	const product_link = `/product/${pr.slug ?? pr.getID()}`;

	return (
		<div
			className="card w-48 h-80 glass flex flex-col items-center justify-around overflow-hidden py-4 px-0 !shadow-md"
			dir="rtl"
		>
			{/* image */}
			<figure className="w-48 rounded-md px-4 py-0">
				<span className="absolute right-1 top-1">
					{first_variation.discount_percent > 0 && (
						<div className="badge w-10 text-[13px] text-center badge-primary ">
							{first_variation.discount_percent}
							{'%'}
						</div>
					)}
				</span>
				<DBImage
					link={product_link}
					className="w-full rounded-xl"
					src={`${pr.name}`}
					width={700}
					height={656}
				/>
			</figure>
			{/* data */}
			<div className="card-body px-4 py-1 gap-0 w-full flex justify-between">
				<Link href={product_link}>
					<p className="h-min text-md leading-5 text-start" dir="auto">
						{pr.short_desc || pr.name}
					</p>
				</Link>

				<div className="card-actions w-full justify-between items-center self-end">
					<AddToBasketButton product={pr} showprice small />
				</div>
			</div>
		</div>
	);
};
