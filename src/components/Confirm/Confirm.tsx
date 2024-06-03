import { BasketItem } from '@codespase/core';
import React from 'react';
import { ProductCard } from '../product/ProductCard/ProductCard';
import { PaymentBtn } from '../PaymentCart/PaymentBtn';

export const Confirm = async () => {
	const data = await BasketItem.get_list();
	return (
		<div className="flex flex-col gap-3">
			<span>
				<p className="p-3 text-md md:text-lg">آدرس :</p>
				<div className="w-full rounded-lg bg-white p-3 flex flex-col gap-3 justify-center">
					<span className="flex justify-between w-full items-center text-[12px] md:text-md">
						<b>مهدی کلهری</b>
						<b className="text-xs" dir="ltr">
							(+98) ***** 378
						</b>
					</span>
					<p className="text-[12px] md:text-md w-full text-justify ">
						تهران، اتوبان شهید همت(غرب)، اتوبان شهید خرازی، ایران‌مال
					</p>
				</div>
			</span>
			<div className="w-full rounded-lg p-3 flex flex-col gap-3 justify-center">
				{data.map((item, index) => {
					if (item.__product == null) return null;
					return (
						<span key={index} className="w-full rounded-lg bg-white">
							<ProductCard
								className={
									'w-full flex-col md:!flex-row  !min-h-0 px-2 !shadow-none text-xs md:text-md'
								}
								overview
								product={item.__product}
								cart={true}
								cartValue={item.quantity}
							/>
						</span>
					);
				})}
			</div>
			<PaymentBtn
				url={'/checkout/PaymentCheck'}
				className={'!btn-success !text-white static bottom-0'}
				text="تکمیل فرایند خرید"
				disabled={false}
			/>
		</div>
	);
};
