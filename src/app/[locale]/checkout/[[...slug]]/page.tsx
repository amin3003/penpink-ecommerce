import { Steps } from '@/components/Checkout/Steps';
import { CheckoutSidebar } from '@/components/Checkout/CheckoutSidebar';
import { CheckoutBox, findCheckoutPath } from '@/components/Checkout/CheckoutBox';
import { getServerPathname } from '@/navigation';
import { BasketItem } from '@codespase/core';

export default async function page() {
	const currentPath = findCheckoutPath(getServerPathname());
	const cartItems = await BasketItem.get_list();

	return (
		<>
			<Steps />
			<div className="flex flex-col lg:flex-row gap-3 mb-5 p-2 md:p-4">
				<CheckoutBox className={'flex-[2]'} cartItems={cartItems} />
				{currentPath?.options.sidebar !== false && (
					<CheckoutSidebar cartItems={cartItems} />
				)}
			</div>
		</>
	);
}

export const dynamic = 'force-dynamic';
