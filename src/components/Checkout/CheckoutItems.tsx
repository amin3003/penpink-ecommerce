import { BasketItem } from '@codespase/core';
import React from 'react';
import { ProductCard } from '../product/ProductCard/ProductCard';
import { CheckoutPageProps } from './CheckoutBox';

export const CheckoutItems = async (props: CheckoutPageProps) => {
	if (!props.items) return null;
	return (
		<div className="w-full rounded-lg flex flex-col gap-2 justify-center">
			{props.cartItems.map((item, index) => {
				if (item.__product == null) return null;
				return (
					<ProductCard
						key={`${item.product_id}-${item.variation_id}-${index}`}
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
