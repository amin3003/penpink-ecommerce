import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';
import ProductSlider from '../ProductSlider/ProductSlider';
import clsx from 'clsx';

/**
 * shows related products for a given product
 * @param props
 * @returns
 */
export default function RelatedProducts(props: { product: Product; className?: string }) {
	return (
		<div className={clsx('overflow-hidden w-full', props.className)}>
			<ProductSlider title="کالا های مرتبط" search={{ __limit: 4 }} />
		</div>
	);
}
