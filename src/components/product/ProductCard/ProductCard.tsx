import AddToBasket from '@/components/Basket/AddToBasket';
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
export const ProductCard = (props: {
	product: Product;
	className?: string;
	cart?: boolean;
	horizontal?: boolean;
	overview?: boolean;
	cartValue?: number;
}) => {
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
				'bg-white',
				`card flex items-center justify-around overflow-hidden `,
				props.horizontal
					? 'w-full min-h-0 flex-row shadow-none py-2 px-2'
					: 'min-h-[21rem] h-max w-48 flex-col shadow-md py-4 px-0'
			)}
			dir="rtl"
		>
			{/* image */}
			{
				<figure className="size-min overflow-visible">
					<span className={clsx(`absolute right-1 top-1`)}>
						{first_variation.discount_percent > 0 && (
							<div className="badge w-10 text-[13px] text-center badge-primary ">
								{first_variation.discount_percent}
								{'%'}
							</div>
						)}
					</span>
					<DBImage
						link={product_link}
						className={clsx(
							'rounded-xl',
							Boolean(props.cart || props.overview) ? 'size-24' : 'size-40'
						)}
						src={String(first_variation.images ?? '')}
						width={512}
						height={512}
					></DBImage>
				</figure>
			}
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

				<div className="card-actions  w-full justify-between items-center self-end">
					<AddToBasket
						product={pr}
						showprice
						small
						cart={props.cart}
						cartValue={props.cartValue}
						overview={props.overview}
					/>
				</div>
			</div>
		</div>
	);
};
