import CheckoutAdress from '@/components/Checkout/CheckoutAddress';
import { CheckoutItems } from '@/components/Checkout/CheckoutItems';
import { CheckoutPayment } from '@/components/Checkout/CheckoutPayment';
import { getServerPathname } from '@/navigation';
import { url_matches } from '@azrico/string';
import clsx from 'clsx';
export type CheckoutOptions = Partial<{
	address: boolean;
	overview: boolean;
	items: boolean;
	payment: boolean;
	sidebar: boolean;
	link: boolean;
	buttonText: string;
}>;
type CheckoutPathType = { text: string; url: string; options: CheckoutOptions };
export const checkoutPaths: CheckoutPathType[] = [
	{
		text: 'انتخاب ادرس',
		url: 'checkout',
		options: { address: true, buttonText: 'ادامه فرایند خرید', link: true },
	},
	{
		text: 'بازبینی',
		url: 'checkout/overview',
		options: { items: true, overview: true, buttonText: 'ثبت سفارش', link: true },
	},
	{
		text: 'پرداخت',
		url: 'checkout/pay',
		options: { payment: true, sidebar: false, link: false },
	},
];
export function findCheckoutPath(p: string): CheckoutPathType | undefined {
	return checkoutPaths.find((s) => url_matches(s.url, p));
}
export function CheckoutBox(props: any) {
	const serverPathname = getServerPathname();
	const currentCheckoutPath = findCheckoutPath(serverPathname);

	if (!currentCheckoutPath) return null;
	return (
		<div
			className={clsx(
				'flex flex-col gap-2 bg-base-100 rounded-lg  py-5 px-5',
				props.className
			)}
			id="checkoutbox"
		>
			<CheckoutAdress {...currentCheckoutPath.options} />
			<CheckoutItems {...currentCheckoutPath.options} />
			<CheckoutPayment {...currentCheckoutPath.options} />
		</div>
	);
}
