import React from 'react';
import { BasketItem } from '@codespase/core';
import { CartSidebarButton } from './CartSidebarButton';
import { getServerPathname } from '@/navigation';
import { custom_trim } from '@azrico/string';
export const checkoutPaths = [
	{ text: 'انتخاب ادرس', url: 'checkout' },
	{ text: 'بازبینی', url: 'checkout/overview' },
	{ text: 'پرداخت', url: 'checkout/pay' },
	{ text: 'اتمام فرایند خرید', url: 'checkout/done' },
];
export const CartSidebar = async (props: any) => {
	const cart_items = await BasketItem.get_list();

	/* --------------------------------- totals --------------------------------- */
	const totalPrice = cart_items.reduce((acc, item) => {
		return acc + Number(item.__variation?.price) * Number(item.quantity);
	}, 0);
	const totalSum = cart_items.reduce((acc, item) => {
		return acc + Number(item.__variation?.useprice) * Number(item.quantity);
	}, 0);
	const totalOff = cart_items.reduce((acc, item) => {
		const originalPrice = Number(item.__variation?.price);
		const discountedPrice = Number(item.__variation?.useprice);
		const quantity = Number(item.quantity);
		const discountPerItem = originalPrice - discountedPrice;
		const totalDiscountForItem = discountPerItem * quantity;
		return acc + totalDiscountForItem;
	}, 0);
	/* ---------------------------------- path ---------------------------------- */
	const currentPath = custom_trim(getServerPathname(), '/');
	const pathIndex = checkoutPaths.findIndex((s) => currentPath === s.url);
	const nextPath = checkoutPaths[pathIndex + 1];
	return (
		<>
			<div className="flex flex-col w-full lg:w-[30%] lg:h-[70vh] !sticky !top-2 !z-10">
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
						<CartSidebarButton
							url={`/${custom_trim(nextPath.url, '/')}`}
							className={'btn-success text-white'}
							text={'ادامه فرایند خرید'}
							disabled={false}
						/>
					)}
				</div>
			</div>
		</>
	);
};
