import AddToBasketButton from '@/components/Basket/AddToBasketButton';
import DBImage from '@/components/Image/DBImage';
import { Product } from '@codespase/core';
import Link from '@/navigation';

import React from 'react';
import clsx from 'clsx';
import { array_first } from '@azrico/object';

/**
 * a single product card. mostly used in sliders
 * @param props
 * @returns
 */
export const ProductCard = (props: { product: Product; className?: string }) => {
	const pr = props.product;

	//we use the first variation of the product to show its price
	//should we use average price or something else...?
	const first_variation = pr.variations[0];
	if (!first_variation) return <></>;

	const product_link = `/product/${pr.slug ?? pr.getID()}`;

	return (
		<div
			className={clsx(
				props.className,
				`card w-48 min-h-[21rem] h-max glass flex flex-col items-center justify-around overflow-hidden py-4 px-0 !shadow-md`
			)}
			dir="rtl"
		>
			{/* image */}
			<figure>
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
					className="size-40 rounded-xl"
					src={String(array_first(pr.variations[0].images) ?? '')}
					width={512}
					height={512}
				/>
			</figure>
			{/* data */}
			<div className="card-body px-4 py-1 gap-1 w-full flex justify-between">
				<Link href={product_link} className="p-1">
					<p className="h-min text-md leading-5 text-start py-1" dir="auto">
						{pr.name}
					</p>
					<p
						className={clsx(
							'text-xs leading-5 max-h-10 text-start opacity-85',
							'my-2 text-ellipsis break-words overflow-hidden block'
						)}
						dir="auto"
					>
						{pr.short_desc}
					</p>
				</Link>

				<div className="card-actions w-full justify-between items-center self-end">
					<AddToBasketButton product={pr} showprice small />
				</div>
			</div>
		</div>
	);
};
