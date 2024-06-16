import { Steps } from '@/components/Checkout/Steps';
import { CheckoutSidebar } from '@/components/Checkout/CheckoutSidebar';
import { CheckoutBox, findCheckoutPath } from '@/components/Checkout/CheckoutBox';
import { getServerPathname } from '@/navigation';

export default function page() {
	const currentPath = findCheckoutPath(getServerPathname());

	return (
		<>
			<Steps />
			<div className="flex flex-col lg:flex-row gap-3 mb-5 p-2 md:p-4">
				<CheckoutBox className={'flex-[2]'} />
				{currentPath?.options.sidebar !== false && (
					<CheckoutSidebar className={'flex-1'} />
				)}
			</div>
		</>
	);
}

export const dynamic = 'force-dynamic';
