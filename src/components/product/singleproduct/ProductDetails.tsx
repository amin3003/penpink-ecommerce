import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, array_merge, wrap_array } from '@azrico/object';
import ProductSection from './ProductSection';
import ProductBrand from './ProductBrand';
export default function ProductDetails(props: {
	product: Product;
	variation: ProductVariation;
	children?: any;
}) {
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	const all_details = array_merge(product.attributes, use_variation.attributes);
	return (
		<ProductSection text="مشخصات">
			<ProductBrand {...props} />
			<div className="flex flex-row gap-2 items-center align-middle">
				<b className="self-start">{'رنگ'}</b>
				<p className="self-start text-xl">{use_variation.getVariationData('color')}</p>
			</div>
			<table className="m-4 text-sm">
				<tbody>
					{all_details.map((r, i) => {
						if (!Array.isArray(r) || r.length == 0) return undefined;
						const detailKey = r.shift();
						const detailValue = r.join('');
						if (!detailKey || !detailValue) return undefined;
						return (
							<tr key={i} className="flex flex-row">
								<td className="w-28 text-start font-bold">{detailKey + ':'}</td>
								<td className="w-24 text-end opacity-85">{detailValue}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{props.children}
		</ProductSection>
	);
}
