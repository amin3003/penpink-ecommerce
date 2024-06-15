'use client';
import React from 'react';
import Image from 'next/image';
import { CheckoutOptions } from './CheckoutBox';
const copyToClipboard = (text: any) => {
	// Remove spaces from the text
	const textWithoutSpaces = text.replace(/\s+/g, '');
	// Copy to clipboard
	navigator.clipboard
		.writeText(textWithoutSpaces)
		.then(() => {
			alert('Copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});
};
export const CheckoutPayment = (props: CheckoutOptions) => {
	if (!props.payment) return;
	return (
		<div className="flex flex-col gap-4">
			<b className="text-justify text-xs leading-6 p-5" dir="rtl">
				سفارش شما با موفقیت ثبت شد !
			</b>
			<b className="text-justify text-xs leading-6 p-5" dir="rtl">
				برای ادامه فرایند جمع مبلغ خرید شده را به شماره حسابی که در زیر درج شده است واریز
				نمایید سپس رسید واریزی را در قسمت اپلود فایل بارگذاری کنید
			</b>
			<div className="mx-auto md:w-[70%] w-full mt-3">
				<div className="bg-white rounded-lg overflow-hidden shadow-lg">
					<div className="px-6 py-4">
						<div className="flex items-center justify-end w-full">
							<Image
								className="h-10 w-10"
								src="/images/Mellat.png"
								alt="Picture of the author"
								width={500}
								height={500}
								quality={100}
							/>
						</div>
						<div className="mt-4">
							<div
								className="font-bold text-gray-800 md:text-xl text-md cursor-pointer"
								onClick={() => copyToClipboard('3564 8546 9945 1234')}
							>
								3564 8546 9945 1234
							</div>
							<div className="flex justify-between items-center mt-2">
								<div className="text-sm text-gray-600">مهدی کلهری</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-100 p-4">
						<span className="flex md:flex-row flex-col-reverse justify-between items-center">
							<div className="font-medium md:text-md text-xs text-gray-600 self-start gap-4">
								بانک ملی
							</div>
							<p
								className="md:text-xs text-[12px] cursor-pointer"
								onClick={() => copyToClipboard('IR 1234 5678 9876 5432 1234 5678')}
							>
								IR 1234 5678 9876 5432 1234 5678
							</p>
						</span>
					</div>
				</div>
			</div>

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
};
