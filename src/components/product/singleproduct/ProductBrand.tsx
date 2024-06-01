import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';
export default function ProductBrand(props: {
	product: Product;
	variation: ProductVariation;
}) {
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];

	//TODO show brand icon
	return (
		<div className="flex flex-row gap-2 items-center align-middle">
			<b className="self-start">{'برند'}</b>
			<p className="self-start text-xl">{use_variation.getVariationData('brand')}</p>
		</div>
	);
}
