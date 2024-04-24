import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
export default function AddToBasketButton(props: {
	product: Product;
	variation: ProductVariation;
	small?: boolean;
	showprice?: boolean;
}) {
	//TODO: when button is clicked add to basket
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	if (!use_variation) return <>product not found</>;

	const btnElement = props.small ? (
		<button>
			<i className="bi bi-bag-plus" />
		</button>
	) : (
		<button className="btn btn-md btn-primary flex items-center w-full">
			افزودن به سبد خرید
		</button>
	);

	if (!props.showprice) return <span className="flex flex-col">{btnElement}</span>;
	return (
		<div className="flex flex-row gap-2" dir="rtl">
			<span className="felx flex-col flex-1">
				<div className="flex gap-2 justify-center items-center">
					<div className="flex flex-col justify-end items-end">
						<span>
							<p>{use_variation.useprice}</p>
						</span>
						<span>
							{use_variation.discount_percent > 0 && (
								<p className="line-through text-xs">{use_variation.price}</p>
							)}
						</span>
					</div>
					<Image
						className=""
						src={`/images/toman.svg`}
						alt="Currency"
						width={30}
						height={30}
						quality={100}
					/>
				</div>
			</span>
			<span className="flex">{btnElement}</span>
		</div>
	);
}
