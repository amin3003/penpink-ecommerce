import React from 'react';
import { BasketItem } from '@codespase/core';
import { CheckoutSideButton } from './CheckoutSideButton';
import { getServerPathname } from '@/navigation';
import { custom_trim, url_matches } from '@azrico/string';
import { checkoutPaths, findCheckoutPath } from './CheckoutBox';
import clsx from 'clsx';

export const CheckoutSidebar = async (props: { cartItems: BasketItem[] }) => {
	const cartItems = props.cartItems;

	/* --------------------------------- totals --------------------------------- */
	const totalPrice = cartItems.reduce((acc, item) => {
		return acc + Number(item.__variation?.price) * Number(item.quantity);
	}, 0);
	const totalSum = cartItems.reduce((acc, item) => {
		return acc + Number(item.__variation?.useprice) * Number(item.quantity);
	}, 0);
	const totalOff = cartItems.reduce((acc, item) => {
		const originalPrice = Number(item.__variation?.price);
		const discountedPrice = Number(item.__variation?.useprice);
		const quantity = Number(item.quantity);
		const discountPerItem = originalPrice - discountedPrice;
		const totalDiscountForItem = discountPerItem * quantity;
		return acc + totalDiscountForItem;
	}, 0);
	/* ---------------------------------- path ---------------------------------- */
	const currentPath = findCheckoutPath(getServerPathname());
	const pathIndex = checkoutPaths.findIndex((s) => s === currentPath);
	const nextPath = checkoutPaths[pathIndex + 1];
	return (
		<>
			<div
				className={clsx('flex flex-col gap-1 h-min sticky top-2 z-10', props.className)}
			>
				<div className="flex flex-col justify-around items-start bg-base-100 !rounded-xl p-10 md:h-[50vh] gap-3 ">
					<span className="flex flex-col gap-4 w-full">
						<div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
							<p className=" font-thin">جمع مبلغ کالاها:</p>
							<p className=" font-thin">{totalPrice.toLocaleString('fa-IR')} تومان</p>
						</div>
						<div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
							<p className="font-thin">سود شما از این خرید:</p>
							<p className=" font-thin">{totalOff.toLocaleString('fa-IR')} تومان</p>
						</div>
					</span>
					<div className="divider !divide-dashed"></div>
					<div className="flex flex-col text-justify w-full gap-2 !my-2 text-sm">
						<p className="text-[10px] font-thin">
							هزینه ارسال در ادامه بر اساس آدرس و نحوه‌ی ارسال محاسبه و اضافه خواهد شد
						</p>

						<div className="flex justify-between w-full gap-2 my-2 text-sm font-bold text-[12px] md:text-[14px]">
							<p className="!text-center">جمع سبد خرید:</p>
							<p className="text-justify">{totalSum.toLocaleString('fa-IR')} تومان</p>
						</div>
					</div>
				</div>
				<div>
					{nextPath && (
						<CheckoutSideButton
							url={`/${custom_trim(nextPath.url, '/')}`}
							text={String(currentPath?.options.buttonText || 'ادامه فرایند خرید')}
							disabled={false}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export const dynamic = 'force-dynamic';