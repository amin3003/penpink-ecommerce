import React from 'react';
import { Product, ProductVariation, BasketItem } from '@codespase/core';
import Image from 'next/image';
import InnerAddToBasketButton from './InnerAddToBasketButton';
import addToBasketAction from './addToBasketAction';

type AddToBasketProps = {
	product: Product;
	variation?: ProductVariation;
	small?: boolean;
	showprice?: boolean;
	cart?: boolean;
	cartValue?: number;
};
export default function AddToBasket(props: AddToBasketProps) {
	const { product, variation, ...restprops } = props;
	const use_variation = props.variation ?? product.variations[0];
	if (!product || !use_variation) return;

	const btnElement = <InnerAddToBasketButton {...restprops} />;
	if (!props.showprice) return <span className="flex flex-col">{btnElement}</span>;
	return (
		<form className="flex flex-row gap-2 flex-1" dir="rtl" action={addToBasketAction}>
			<input hidden name="productid" defaultValue={product.getID()}></input>
			<input
				hidden
				name="variationcode"
				defaultValue={use_variation.getVariationCode()}
			></input>
			<span className="felx flex-col flex-1">
				<div className="flex gap-2 items-center">
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
						className="size-[30px]"
						src={`/images/toman.svg`}
						alt=""
						width={30}
						height={30}
						quality={100}
					/>
				</div>
			</span>
			<span className="flex">{btnElement}</span>
		</form>
	);
}
