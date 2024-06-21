import CheckoutAdress from '@/components/Checkout/CheckoutAddress';
import { CheckoutItems } from '@/components/Checkout/CheckoutItems';
import { CheckoutPayment } from '@/components/Checkout/CheckoutPayment';
import { getServerPathname } from '@/navigation';
import { url_matches } from '@azrico/string';
import { BasketItem } from '@codespase/core';
import clsx from 'clsx';
export type CheckoutOptions = Partial<{
	address: boolean;
	overview: boolean;
	items: boolean;
	payment: boolean;
	sidebar: boolean;
	confirm: boolean;
	link: boolean;
	buttonText: string;
}>;
export type CheckoutPageProps = CheckoutOptions & {
	cartItems: BasketItem[];
};
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
		options: {
			items: true,
			overview: true,
			confirm: true,
			buttonText: 'ثبت سفارش',
			link: true,
		},
	},
	{
		text: 'پرداخت',
		url: 'checkout/pay',
		options: { payment: true, sidebar: false, link: false },
	},
];
export function findCheckoutPath(s: string): CheckoutPathType | undefined {
	const search = s.split('?').shift();
	const fp = checkoutPaths.find((s) => url_matches(s.url, search));

	return fp;
}
export function CheckoutBox(props: { cartItems: BasketItem[]; className?: string }) {
	const serverPathname = getServerPathname();
	const currentCheckoutPath = findCheckoutPath(serverPathname);

	if (!currentCheckoutPath) return null;
	return (
		<div
			className={clsx(
				'flex flex-col gap-2 bg-base-100 rounded-lg p-2 md:p-5 min-h-[60vh]',
				props.className
			)}
			id="checkoutbox"
		>
			<CheckoutAdress cartItems={cartItems} {...currentCheckoutPath.options} />
			<CheckoutItems cartItems={cartItems} {...currentCheckoutPath.options} />
			<CheckoutPayment cartItems={cartItems} {...currentCheckoutPath.options} />
		</div>
	);
}
