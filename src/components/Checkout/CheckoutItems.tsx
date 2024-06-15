import { BasketItem } from '@codespase/core';
import React from 'react';
import { ProductCard } from '../product/ProductCard/ProductCard';
import { CheckoutOptions } from './CheckoutBox';

export const CheckoutItems = async (props: CheckoutOptions) => {
	if (!props.items) return null;
	const data = await BasketItem.get_list();
	return (
		<div className="w-full rounded-lg flex flex-col gap-2 justify-center">
			{data.map((item, index) => {
				if (item.__product == null) return null;
				return (
					<ProductCard
						key={index}
						className="bg-white"
						overview
						product={item.__product}
						cart={false}
						horizontal
						cartValue={item.quantity}
					/>
				);
			})}
		</div>
	);
};
