import { BasketItem, ProductVariation } from '@codespase/core';
import React from 'react';
import Link from '@/navigation';
//TODO BASKET SYSTEM BASED ON ORDER SYSTEM (CHECK ?)
export default async function Basket(props: any) {
	const items = await BasketItem.get_list('');
	console.log(items);
	 
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
