import React from 'react';
import { Product } from '@codespase/core';
import Image from 'next/image';
export default function AddToBasketButton(props: {
	product: Product;
	small?: boolean;
	showprice?: boolean;
}) {
	//TODO: when button is clicked add to basket
	const { product } = props;
	const first_variation = product.variations[0];
	if (!first_variation) return <>product not found</>;

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
		<>
			<span className="flex flex-col">{btnElement}</span>
			<span className="felx flex-col">
				<div className="flex gap-2 justify-center items-center">
					<div className="flex flex-col justify-end items-end">
						<span>
							<p>{first_variation.useprice}</p>
						</span>
						<span>
							{first_variation.discount_percent > 0 && (
								<p className="line-through text-xs">{first_variation.price}</p>
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
		</>
	);
}
