import { CheckoutSidebar, findCheckoutPath } from '@/components/Checkout/CheckoutSidebar';

import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { BasketItem } from '@codespase/core';

export default async function Page() {
	const cartItems = await BasketItem.get_list();
	return (
		<>
			<div className="flex flex-col lg:flex-row gap-3 lg:h-min-[70vh] p-4">
				<div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 rounded-xl py-5 px-5">
					{cartItems.length === 0 ? (
						<div className="flex justify-center items-center w-full h-full">
							<i className="bi bi-basket2-fill text-[100px] text-gray-500"></i>
						</div>
					) : (
						cartItems.map((item, index) => {
							if (item.__product == null) return null;
							return (
								<ProductCard
									key={item.getID()}
									product={item.__product}
									cart
									horizontal
									cartValue={item.quantity}
								/>
							);
						})
					)}
				</div>
				<CheckoutSidebar />
			</div>
		</>
	);
}
