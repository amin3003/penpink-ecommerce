import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';
import ProductSlider from '../ProductSlider/ProductSlider';

/**
 * shows related products for a given product
 * @param props
 * @returns
 */
export default function RelatedProducts(props: { product: Product }) {
	return (
		<div className="overflow-hidden w-full">
			<ProductSlider title="کالا های مرتبط" search={{ __limit: 4 }} />
		</div>
	);
}
