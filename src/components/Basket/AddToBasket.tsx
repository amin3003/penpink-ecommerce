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
	const use_variation = props.variation ?? product.variations[0];
	if (!product || !use_variation) return;
	const variation_data = await use_variation.get_basicObject();
	const variationcode = use_variation.getVariationCode();

	return (
		<InnerAddToBasketButton
			{...restprops}
			variation_data={variation_data}
			variationcode={variationcode}
			productid={product.getID()}
		/>
	);
}
