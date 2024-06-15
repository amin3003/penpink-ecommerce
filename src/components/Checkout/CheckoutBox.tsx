import CheckoutAdress from '@/components/Checkout/CheckoutAddress';
import { CheckoutItems } from '@/components/Checkout/CheckoutItems';
import { CheckoutPayment } from '@/components/Checkout/CheckoutPayment';
import { getServerPathname } from '@/navigation';
import { url_matches } from '@azrico/string';
export type CheckoutOptions = Partial<{
	address: boolean;
	overview: boolean;
	items: boolean;
	payment: boolean;
}>;
type CheckoutPathType = { text: string; url: string; options: CheckoutOptions };
export const checkoutPaths: CheckoutPathType[] = [
	{ text: 'انتخاب ادرس', url: 'checkout', options: { address: true } },
	{ text: 'بازبینی', url: 'checkout/overview', options: { items: true, overview: true } },
	{ text: 'پرداخت', url: 'checkout/pay', options: { payment: true } },
	{ text: 'اتمام فرایند خرید', url: 'checkout/done', options: {} },
];
export function findCheckoutPath(p: string): CheckoutPathType | undefined {
	return checkoutPaths.find((s) => url_matches(s.url, p));
}
export function CheckoutBox() {
	const serverPathname = getServerPathname();
	const currentCheckoutPath = findCheckoutPath(serverPathname);

	if (!currentCheckoutPath) return null;
	return (
		<div className="flex flex-col gap-2" id="checkoutbox">
			<CheckoutAdress {...currentCheckoutPath.options} />
			<CheckoutItems {...currentCheckoutPath.options} />
			<CheckoutPayment {...currentCheckoutPath.options} />
		</div>
	);
}
