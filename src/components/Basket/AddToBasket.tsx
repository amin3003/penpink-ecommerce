import React from 'react';
import { Product, ProductVariation, BasketItem } from '@codespase/core';
import Image from 'next/image';
import InnerAddToBasketButton, {
	SharedAddToBasketButtonProps,
} from './InnerAddToBasketButton';

type AddToBasketProps = SharedAddToBasketButtonProps & {
	product: Product;
	variation?: ProductVariation;
};
export default async function AddToBasket(props: AddToBasketProps) {
	const { product, variation, ...restprops } = props;
	const useVariation = props.variation ?? product.variations[0];
	if (!product || !useVariation) return;
	const variation_data = await useVariation.get_basicObject();
	const product_id = product.getID();
	const variation_id = useVariation.getID();
	return (
		<InnerAddToBasketButton
			key={`${product_id}-${variation_id}`}
			{...restprops}
			name={product.name}
			variation_data={variation_data}
			variation_id={variation_id}
			product_id={product_id}
		/>
	);
}
