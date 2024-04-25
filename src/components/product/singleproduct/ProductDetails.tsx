import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, array_merge, wrap_array } from '@azrico/object';
export default function ProductDetails(props: {
	product: Product;
	variation: ProductVariation;
}) {
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	const all_details = array_merge(product.details, use_variation.details);
	return (
		<div className="flex flex-col gap-2 min-h-[400px]">
			<p className="self-start font-bold">{'مشخصات' + ' : '}</p>
			<table className="m-4">
				<tbody>
					{all_details.map((r, i) => {
						if (!Array.isArray(r) || r.length == 0) return undefined;
						const detailKey = r.shift();
						const detailValue = r.join('');
						return (
							<tr key={i} className="flex flex-row">
								<td className="w-28 text-start font-bold">{detailKey + ':'}</td>
								<td className="w-24 text-end opacity-85">{detailValue}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
