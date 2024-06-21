import AddToBasket from '@/components/Basket/AddToBasket';
import DBImage from '@/components/Image/DBImage';
import { Product, ProductVariation } from '@codespase/core';
import Link from '@/navigation';

import React from 'react';
import clsx from 'clsx';
import { array_first } from '@azrico/object';

type ProductCartBaseProps = {
	product: Product;
	variation?: ProductVariation;
	className?: string;
	horizontal?: boolean;
	overview?: boolean;
	cartValue?: number;
	cart?: boolean;
};

/**
 * a single product card. mostly used in sliders
 * @param props
 * @returns
 */
export const ProductCard = (props: ProductCartBaseProps) => {
	const pr = props.product;
	const useVariation: ProductVariation = (props as any).variation ?? pr.variations[0];
	const isCart = (props as any).cart;
	if (!useVariation) return <></>;

	const product_link = `/product/${pr.slug ?? pr.getID()}`;

	return (
		<div
			className={clsx(
				props.className,
				'bg-white rounded-lg',
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
						{useVariation.discount_percent > 0 && (
							<div className="badge w-10 text-[13px] text-center badge-primary ">
								{useVariation.discount_percent}
								{'%'}
							</div>
						)}
					</span>
					<DBImage
						link={product_link}
						className={clsx(
							'rounded-xl',
							Boolean(isCart || props.overview) ? 'size-24' : 'size-40'
						)}
						src={String(useVariation.images ?? '')}
						width={512}
						height={512}
					></DBImage>
				</figure>
			}
			{/* data */}
			<div className="card-body px-4 py-1 gap-1 w-full flex justify-between">
				<Link href={product_link} className="p-1">
					<p
						className={clsx(
							'h-min text-md leading-5 text-start py-1 flex',
							props.horizontal ? 'flex-row' : 'flex-col'
						)}
						dir="auto"
					>
						<span className="flex-1">{pr.name}</span>
						<span className="text-xs opacity-80 gap-2 flex">
							<span>{useVariation.getVariationData('brand')}</span>
							<span>{useVariation.getVariationData('color')}</span>
						</span>
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
						variation={useVariation}
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
