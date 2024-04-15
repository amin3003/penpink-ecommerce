import { Product } from '@codespase/core';
import Image from 'next/image';
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
	return (
		<div
			className="card w-48 h-80 glass flex flex-col items-center justify-around overflow-hidden py-4 px-0 !shadow-md"
			dir="rtl"
		>
			<figure className="w-48 rounded-md px-4 py-0">
				<span className="absolute right-1 top-1">
					{first_variation.discount_percent > 0 && (
						<div className="badge w-10 text-[13px] text-center badge-primary ">
							{first_variation.discount_percent}
							{'%'}
						</div>
					)}
				</span>
				<Image
					className="w-full rounded-xl"
					src={`/images/product/${pr.name}.jpeg`}
					alt={pr.name ?? ''}
					width={700}
					height={656}
					quality={100}
					layout="responsive"
				/>
			</figure>
			<div className="card-body px-4 py-1 gap-0">
				<p className="text-right h-min text-md leading-5 ">{pr.short_desc || pr.name}</p>
				<div className="card-actions w-full justify-between items-center">
					<span className="flex flex-col">
						<button role="submit">
							<i className="bi bi-bag-plus" />
						</button>
					</span>
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
				</div>
			</div>
		</div>
	);
};
