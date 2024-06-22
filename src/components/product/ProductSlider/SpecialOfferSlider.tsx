import clsx from 'clsx';
import React from 'react';
import { Product } from '@codespase/core';
import SwiperLayout from '../../Sliders/SwiperLayout';
import Image from 'next/image';
import { ProductCard } from '../ProductCard/ProductCard';

/**
 * A single product card, mostly used in sliders.
 * @param props
 * @returns
 */
export default async function SpecialOfferSlider(props: {
	search: any;
	className?: string;
	cart?: boolean;
	hideBasket?: boolean;
	cartValue?: number;
}) {
	const products = await Product.get_list({
		special: true,
	});

	if (!products || products.length === 0) {
		return <></>; // RetUrn empty fragment if no products found
	}

	return (
		<div className="flex flex-col gap-5 items-center justify-center">
			<b className="md:text-2xl text-md">تخفیف ویژه </b>
			<span className="w-full ">
				<Image
					className="absolute -z-5 top-[126rem] right-[-1rem]"
					src="/images/party1.svg"
					alt="Picture of the author"
					width={300}
					height={300}
					quality={100}
				/>
				<div className="bg-primary w-full rounded-xl flex flex-row gap-10 items-center justify-around p-6">
					<SwiperLayout
						className={'w-full'}
						enableAutoplay={true}
						content={products.map((product, index) => {
							/**
							 * show the variation that has most discoun
							 */
							const preferedVariation = product.variations.find(
								(s) => s.discount_percent > 0
							);
							return (
								<ProductCard
									key={product.getID()}
									product={product}
									prefer={preferedVariation}
								/>
							);
						})}
					/>
				</div>
				<Image
					className="absolute -z-5 left-0 top-[145rem]"
					src="/images/party2.svg"
					alt="Picture of the author"
					width={300}
					height={300}
					quality={100}
				/>
			</span>
		</div>
	);
}
