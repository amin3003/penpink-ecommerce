import { BasketItem, ProductVariation } from '@codespase/core';
import React from 'react';
import Link from '@/navigation';
//TODO BASKET SYSTEM BASED ON ORDER SYSTEM
export default async function Basket(props: any) {
	const items = await BasketItem.get_list('');
	const fi = items[0];
	const vari = fi.__product?.variations.find((s) =>
		ProductVariation.equals(s, fi.variation_code, true)
	);
	console.log(fi.__product?.variations);
	console.log(fi.variation_code);
	console.log(vari);
	return (
		<>
			<Link href={'/cart'}>
				<div className="indicator btn btn-ghost btn-sm">
					<i className="bi bi-cart-fill text-lg"></i>
					<span className="badge badge-accent badge-sm indicator-item indicator-start">
						{items.length ?? 0}
					</span>
				</div>
			</Link>
		</>
	);
}
