import { Steps } from '@/components/Checkout/Steps';
import { CheckoutSidebar } from '@/components/Checkout/CheckoutSidebar';
import { CheckoutBox } from '@/components/Checkout/CheckoutBox';

export default function page() {
	return (
		<>
			<Steps />
			<div className="flex flex-col lg:flex-row gap-3 !rounded-[20%] mb-5 p-4">
				<div className="flex flex-col gap-3 w-full lg:w-[70%] min-h-[70vh] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
					<CheckoutBox />
				</div>
				<CheckoutSidebar />
			</div>
		</>
	);
}

export const dynamic = 'force-dynamic';
