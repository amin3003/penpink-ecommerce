import React from 'react';
import { CheckoutPageProps } from '../CheckoutBox';
import { BankCard } from '../BankCard';
import { Order } from '@codespase/core';
import { getServerSearchParams } from '@/navigation';
import { object_get } from '@azrico/object';
import { BSONType } from 'mongodb';
import { SendPayCodeForm } from './SendPayCodeForm';
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
				نمایید سپس شماره پیگیری واریزی را در قسمت زیر وارد کنید یا به شماره{' '}
				<bdi>
					<a href="https://wa.me/+905346545810" className="">
						+90 534 654 58 10
					</a>
				</bdi>
				واتساپ ارسال کنید.
			</b>
			<BankCard />

			<SendPayCodeForm orderid={targetOrder.getID()} />
		</div>
	);
}
export const dynamic = 'force-dynamic';
