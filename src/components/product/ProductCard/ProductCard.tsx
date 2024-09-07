import AddToBasket from '@/components/Basket/AddToBasket';
import DBImage from '@/components/Image/DBImage';
import { Product, ProductVariation } from '@codespase/core';
import Link from '@/navigation';

import React from 'react';
import clsx from 'clsx';

type ProductCartBaseProps = {
	product: Product;
	variation?: ProductVariation;
	prefer?: Partial<ProductVariation>;
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

	/* -------------------------------------------------------------------------- */
	/*                         chose the variation to show                        */
	/* -------------------------------------------------------------------------- */
	let useVariation: ProductVariation | undefined = undefined;
	if (props.variation) {
		/**
		 * use this variation
		 * this is useful on basket, always display the given variation
		 */
		useVariation = props.variation;
	} else if (props.prefer) {
		/**
		 * prefer to use this given variation if possible
		 * this is useful when searching
		 * we want to show the variation user is searching for
		 */
		useVariation = pr.getVariation(props.prefer as any, true);
	}
	if (!useVariation) useVariation = pr.variations[0];

	const isCart = (props as any).cart;
	if (!useVariation) return <></>;

	/**
	 * link to the currently displayed variation
	 */
	const product_link =
		`/product/${pr.slug ?? pr.getID()}` +
		`?brand=${useVariation.getVariationData('brand') || ''}&color=${useVariation.getVariationData('color') || ''}`;

	return (
		<div
			className={clsx(
				props.className,
				'bg-white rounded-lg',
				`card flex items-center justify-around overflow-hidden `,
				props.horizontal
					? 'w-full min-h-0 flex-col md:flex-row shadow-none py-2 px-2'
					: 'min-h-[21rem] h-max w-48 flex-col shadow-md pt-4 pb-1 px-0'
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
			<div className="card-body  px-4 py-1 gap-1 w-full flex justify-between">
				{/* details */}
				<Link href={product_link} className="p-1 flex-1">
					<p
						className={clsx(
							'h-min text-md leading-5 text-start py-1 flex gap-1',
							props.horizontal ? 'flex-row' : 'flex-col'
						)}
						dir="auto"
					>
						<span className="flex-1">{pr.name}</span>
						<span className="flex flex-row text-xs opacity-80 gap-1">
							<span>{useVariation.getVariationData('brand')}</span>
							<span>{useVariation.getVariationData('color')}</span>
						</span>
					</p>
					<p
						className={clsx(
							'text-xs leading-5 align-top text-start opacity-85',
							'my-2 line-clamp-2'
						)}
						dir="auto"
					>
						{pr.short_desc}
					</p>
				</Link>

				{/* actions */}
				<div className="card-actions  w-full justify-between  items-center self-end">
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
