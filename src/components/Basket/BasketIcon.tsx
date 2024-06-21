import { BasketItem, ProductVariation } from '@codespase/core';
import React from 'react';
import Link from '@/navigation';
export default async function BasketIcon(props: any) {
	const basketCount = await BasketItem.get_count();
	return (
		<>
			<Link href={'/cart'}>
				<div className="indicator btn btn-ghost btn-sm">
					<i className="bi bi-cart-fill text-lg"></i>
					<span className="badge badge-accent badge-sm indicator-item indicator-start">
						{basketCount}
					</span>
				</div>
			</Link>
		</>
	);
}
export const dynamic = 'force-dynamic';
