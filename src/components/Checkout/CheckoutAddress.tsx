import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import { Selector } from '../Selector/Selector';
import { CheckoutOptions } from './CheckoutBox';
import { gcache } from '@azrico/global';
import { cookies } from 'next/headers';
import { SimpleUserPreference } from '@codespase/core';

const cityList = ['تهران', 'گرگان'];
const ostanList = ['تهران', 'گرگان', 'زنجان', 'سمنان', 'گلستان'];
export default async function CheckoutAddress(props: CheckoutOptions) {
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
					<b className="text-xs" dir="ltr">
						{addressObject['phone']}
					</b>
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
	const { addressObject } = props;
	return (
		<form id="address-form" className="px-3 py-5 mt-5" dir="rtl">
			<div className="flex flex-col justify-center gap-3">
				<span className="flex flex-col md:flex-row justify-between gap-4 w-full">
					<TextField
						defaultValue={addressObject['name']}
						name="name"
						type="text"
						placeholder={'نام'}
						wrapperClassName={'w-full'}
						inputClass={'w-[50%]'}
						className={clsx('w-full aria-[errormessage]:border-red-500')}
					/>
					<TextField
						defaultValue={addressObject['lastname']}
						name="lastname"
						type="text"
						placeholder={'نام خانوادگی'}
						wrapperClassName={'w-full'}
						inputClass={'w-[50%]'}
						className={clsx('w-full aria-[errormessage]:border-red-500')}
					/>
				</span>
				<TextField
					defaultValue={addressObject['phone']}
					name="phone"
					type="phone"
					placeholder={'شماره تلفن'}
					className={clsx('w-full aria-[errormessage]:border-red-500')}
				/>
				<p className="text-[12px] md:text-xs text-justify">
					در وارد کردن شماره تلفن دقت نمایید,زیرا کلیه موارد خرید و ارسال کالا از طریق
					پیامک به اطلاع شما خواهد رسید.
				</p>
				<span className="flex flex-col md:flex-row mb-5 justify-between gap-4 w-full">
					<Selector
						defaultValue={addressObject['city']}
						name="city"
						label="شهر"
						optionData={cityList}
						className={clsx(' aria-[errormessage]:border-red-500')}
					/>
					<Selector
						defaultValue={addressObject['ostan']}
						name="ostan"
						label="استان"
						optionData={ostanList}
						className={clsx(' aria-[errormessage]:border-red-500')}
					/>
				</span>
				<TextField
					defaultValue={addressObject['postCode']}
					name="postCode"
					type="number"
					placeholder={'کد پستی'}
					className={clsx('w-full aria-[errormessage]:border-red-500')}
				/>
				<TextField
					defaultValue={addressObject['address']}
					name="address"
					type="text"
					placeholder={'آدرس پستی'}
					className={clsx('w-full aria-[errormessage]:border-red-500')}
				/>
			</div>
		</form>
	);
}
