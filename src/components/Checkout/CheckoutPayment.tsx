import React from 'react';
import { CheckoutPageProps } from './CheckoutBox';
import { BankCard } from './BankCard';
import { Order } from '@codespase/core';
import { getServerSearchParams } from '@/navigation';
import { object_get } from '@azrico/object';
export async function CheckoutPayment(props: CheckoutPageProps) {
	if (!props.payment) return;
	const sp = getServerSearchParams();
	const targetOrder = await Order.get_single(object_get(sp, 'id', 'order', '_i'));

	return (
		<div className="flex flex-col gap-6">
			<b className="text-justify text-xs leading-6 p-5" dir="rtl">
				سفارش شما با موفقیت ثبت شد !
			</b>
			<b className="text-justify text-xs leading-6 p-5" dir="rtl">
				{'مبلق قابل پرداخت :' + targetOrder.total}
			</b>
			<b className="text-justify text-xs leading-6 p-5" dir="rtl">
				برای ادامه فرایند جمع مبلغ خرید شده را به شماره حسابی که در زیر درج شده است واریز
				نمایید سپس رسید واریزی را در قسمت اپلود فایل بارگذاری کنید
			</b>
			<BankCard />

			<form id="payment-confirm-form">
				<label className="form-control w-full max-w-xs mx-auto">
					<div className="label">
						<span className="label-text">شماره پیگیری خود را وارد کنید</span>
					</div>
					<input
						name="payment-code"
						type="text"
						placeholder="583029417362"
						className="input input-bordered input-primary w-full max-w-xs"
					/>
				</label>
			</form>
		</div>
	);
}
