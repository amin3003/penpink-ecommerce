import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import ProductSection from './ProductSection';
export default function ProductDetails(props: {
	product: Product;
	variation: ProductVariation;
	children?: any;
}) {
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	const all_details = Object.entries(use_variation.variation_data);
	return (
		<ProductSection text="مشخصات">
			<table className="m-4 text-sm">
				<tbody>
					{all_details.map((r, i) => {
						const detailKey = r.shift();
						const detailValue = r.join('');
						if (!detailKey || !detailValue) return undefined;
						return (
							<tr key={i} className="flex flex-row">
								<td className="w-28 text-start font-bold">{detailKey}</td>
								<td className="text-start font-bold">{':'}</td>
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
