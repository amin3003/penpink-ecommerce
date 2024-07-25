import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import { Selector } from '../Selector/Selector';
import { CheckoutPageProps } from './CheckoutBox';
import { SimpleUserPreference } from '@codespase/core';
import { getServerSearchParams } from '@/navigation';

const cityList = [
	'تهران',
	'شهریار',
	'کرج',
	'قدس',
	'پاکدشت',
	'پردیس',
	'بومهن',
	'اسلامشهر',
	'ملارد',
	'دماوند',
	'رودهن',
	'فیروزکوه',
	'شهرری',
];
const ostanList = ['تهران'];
export default async function CheckoutAddress(props: CheckoutPageProps) {
	const addressInDb = (await SimpleUserPreference.getPreference('', 'address'))?.value;
	let addressObject: any = {};
	try {
		addressObject = addressInDb ? JSON.parse(addressInDb) : '';
	} catch {}
	if (props.overview) {
		return (
			<div className="w-full rounded-lg bg-white p-3 flex flex-col gap-3 justify-center">
				<span className="flex justify-between w-full items-center text-[12px] md:text-md">
					<b>{addressObject['name'] + ' ' + addressObject['lastname']} </b>
					<span className="flex flex-col gap-2 ">
						<b className="text-xs" dir="ltr">
							{addressObject['phone']}
						</b>
						<b className="text-xs" dir="ltr">
							{addressObject['email']}
						</b>
					</span>
				</span>
				<p className="text-[12px] md:text-md w-full text-justify ">
					{addressObject['address']}
				</p>
			</div>
		);
	}
	if (props.address) return <AddressForm addressObject={addressObject} />;

	return <></>;
}
function AddressForm(props: { addressObject: any }) {
	const sp = getServerSearchParams();
	const fieldsWithError = Object.fromEntries(
		sp.getAll('error').map((r) => [r, 'مقدار نامعتبر'])
	);

	const { addressObject } = props;
	return (
		<form id="address-form" className="px-3 py-5 mt-5" dir="rtl">
			<div className="flex flex-col justify-center gap-3">
				<span className="flex flex-col md:flex-row justify-between gap-4 w-full">
					<TextField
						defaultValue={addressObject['name']}
						errors={fieldsWithError}
						name="name"
						type="text"
						placeholder={'نام'}
						wrapperClassName={'w-full'}
						inputClass={'w-[50%]'}
						className={clsx('w-full')}
					/>
					<TextField
						defaultValue={addressObject['lastname']}
						errors={fieldsWithError}
						name="lastname"
						type="text"
						placeholder={'نام خانوادگی'}
						wrapperClassName={'w-full'}
						inputClass={'w-[50%]'}
						className={clsx('w-full ')}
					/>
				</span>
				<TextField
					defaultValue={addressObject['phone']}
					errors={fieldsWithError}
					name="phone"
					type="phone"
					placeholder={'شماره تلفن'}
					className={clsx('w-full  ')}
				/>
				<TextField
					defaultValue={addressObject['email']}
					errors={fieldsWithError}
					name="email"
					type="email"
					placeholder={'ایمیل'}
					className={clsx('w-full  ')}
				/>
				<p className="text-[12px] md:text-xs text-justify">
					در وارد کردن شماره تلفن دقت نمایید,زیرا کلیه موارد خرید و ارسال کالا از طریق
					پیامک به اطلاع شما خواهد رسید.
				</p>
				<span className="flex flex-col md:flex-row mb-5 justify-between gap-4 w-full">
					<Selector
						defaultValue={addressObject['ostan']}
						name="ostan"
						label="استان"
						optionData={ostanList}
						className={clsx(' aria-[errormessage]:border-red-500')}
					/>
					<Selector
						defaultValue={addressObject['city']}
						name="city"
						label="شهر"
						optionData={cityList}
						className={clsx('  ')}
					/>
				</span>
				<TextField
					defaultValue={addressObject['postCode']}
					errors={fieldsWithError}
					name="postCode"
					type="number"
					placeholder={'کد پستی'}
					className={clsx('w-full ')}
				/>
				<TextField
					defaultValue={addressObject['address']}
					errors={fieldsWithError}
					name="address"
					type="text"
					placeholder={'آدرس پستی'}
					className={clsx('w-full  ')}
				/>
			</div>
		</form>
	);
}
export const dynamic = 'force-dynamic';