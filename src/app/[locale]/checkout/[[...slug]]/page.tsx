import CheckoutAdress from '@/components/Checkout/CheckoutAddress';
import { CheckoutOverview } from '@/components/Checkout/CheckoutOverview';
import { CheckoutPayment } from '@/components/Checkout/CheckoutPayment';
import { Steps } from '@/components/Checkout/Steps';
import { getServerPathname } from '@/navigation';
import { CartSidebar } from '@/components/CartSidebar/CartSidebar';

export default function page() {
	const serverPathname = getServerPathname();
	const lastPath = String(serverPathname.split('/').pop());
	return (
		<>
			<Steps />

			<div className="flex flex-col lg:flex-row gap-3 lg:h-min-[70vh] !rounded-[20%] mb-5 p-4">
				<div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
					{findComponent(lastPath)}
				</div>
				<CartSidebar />
			</div>
		</>
	);
}
function findComponent(path: string) {
	switch (path) {
		//TODO Checkout done page
		case 'done':
			return <></>;
		case 'overview':
			return <CheckoutOverview />;
		case 'pay':
		case 'payment':
			return <CheckoutPayment />;
		case 'address':
		default:
			return <CheckoutAdress />;
	}
}
