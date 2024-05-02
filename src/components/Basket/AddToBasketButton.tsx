import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import { gstorage, gbasket } from '@azrico/global';
import Image from 'next/image';
import AddToBasketController from './AddToBasketController';
import AzFetch from '@azrico/fetch';
export default function AddToBasketButton(props: {
	product: Product;
	variation?: ProductVariation;
	small?: boolean;
	showprice?: boolean;
}) {
	//TODO: when button is clicked add to basket
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	const vcode = use_variation.getVariationCode();
	const buttonid = `btn-addbasket-${vcode}`;

	if (!use_variation) return <>product not found</>;

	const btnElement = props.small ? (
		<button className="btn btn-circle btn-ghost" id={buttonid}>
			<i className="bi bi-bag-plus" />
		</button>
	) : (
		<button
			className="btn btn-md text-xs md:text-md btn-primary flex items-center w-full"
			id={buttonid}
		>
			افزودن به سبد خرید
		</button>
	);

	async function addToBasket() {
		'use server';
		//TODO fix
		return await AzFetch.post(`@/api/basket?code=${vcode}&quantity=1`, {});
	}

	if (!props.showprice) return <span className="flex flex-col">{btnElement}</span>;
	return (
		<form
			key={vcode}
			className="flex flex-row gap-2 flex-1"
			dir="rtl"
			action={addToBasket}
		>
			{/* <AddToBasketController variation_code={vcode} /> */}
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
		</form>
	);
}
