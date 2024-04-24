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
		<div className="flex flex-row gap-2">
			<p className="self-start font-bold">{'برند' + ' : '}</p>
			<p className="self-start">{use_variation.brand}</p>
		</div>
	);
}
