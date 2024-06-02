'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import Button from '../SubmitButton/SubmitButton';
import Azfetch, { AzFetch, AzNextHelper } from '@azrico/fetch';
import { entries_to_object } from '@azrico/object';
import { Selector } from '../Selector/Selector';
import { PaymentBtn } from '../PaymentCart/PaymentBtn';

export default function CheckoutAddress() {
  const ref = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<any>({});

  const [errors, setErrors] = useState<any>({});

  const [login, setLogin] = useState<boolean>(true);
  const handleClick = () => {
    setLogin((prevValue) => !prevValue);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

   

  useEffect(() => {
		// Validation
		const newErrors: Partial<any> = {};
		if (formData.name != undefined && formData.name.trim() === '') {
			newErrors.name = 'نام خود را وارد کنید ';
		}
		if (formData.lastname != undefined && formData.lastname.trim() === '') {
			newErrors.lastname = 'نام خانوادگی خود را وارد کنید ';
		}
		if (formData.phone != undefined && formData.phone.trim() === '') {
			newErrors.phone = 'شماره تلفن خود را وارد کنید ';
		}
		if (formData.phone != undefined && formData.phone.trim() === '') {
			newErrors.state = 'استان خود را وارد کنید ';
		}
		if (formData.phone != undefined && formData.phone.trim() === '') {
			newErrors.city = 'شهر خود را وارد کنید ';
		}
		if (formData.postId != undefined && formData.postId.trim() === '') {
			newErrors.postId = 'شماره پستی خود را وارد کنید ';
		}
		if (formData.address != undefined && formData.address.trim() === '') {
			newErrors.address = 'آدرس پستی خود را وارد کنید ';
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			setErrors({});
		}
	}, [formData]);

	return (
		<div className="" dir="rtl">
			<div className="px-3 py-5 mt-5">
				<form ref={ref} id="contact-form" name="contact-form" className={clsx('')}>
					<div className="flex flex-col justify-center gap-3">
						<span className="flex flex-col md:flex-row justify-between gap-4 w-full">
							<TextField
								name="name"
								type="text"
								value={formData.name ?? ''}
								onChange={handleInputChange}
								placeholder={'نام'}
								wrapperClassName={'w-full'}
								inputClass={'w-[50%]'}
								className={clsx('w-full', errors.name && 'border-red-500')}
							/>
							{errors.name && <span className="text-red-500">{errors.name}</span>}

							<TextField
								name="lastname"
								type="text"
								value={formData.lastname ?? ''}
								onChange={handleInputChange}
								placeholder={'نام خانوادگی'}
								wrapperClassName={'w-full'}
								inputClass={'w-[50%]'}
								className={clsx('w-full', errors.lastname && 'border-red-500', '')}
							/>
							{errors.name && <span className="text-red-500">{errors.lastname}</span>}
						</span>
						<TextField
							name="phone"
							type="phone"
							value={formData.phone ?? ''}
							onChange={handleInputChange}
							placeholder={'شماره تلفن'}
							className={clsx('w-full', errors.phone && 'border-red-500', '')}
						/>
						{errors.name && <span className="text-red-500">{errors.phone}</span>}
						<p className="text-[12px] md:text-xs text-justify">
							در وارد کردن شماره تلفن دقت نمایید,زیرا کلیه موارد خرید و ارسال کالا از طریق
							پیامک به اطلاع شما خواهد رسید.
						</p>
						{/* flex flex-col md:flex-row justify-between gap-4 w-full */}
						<span className="flex flex-col md:flex-row mb-5 justify-between gap-4 w-full">
							<Selector
								label="استان"
								optionData={['تهران', 'گرگان', 'زنجان', 'سمنان', 'گلستان']}
							/>
							{errors.name && <span className="text-red-500">{errors.state}</span>}
							<Selector label="شهر" optionData={['تهران', 'گرگان']} />
							{errors.name && <span className="text-red-500">{errors.city}</span>}
						</span>
						<TextField
							name="postId"
							type="number"
							value={formData.postId ?? ''}
							onChange={handleInputChange}
							placeholder={'شماره پستی'}
							className={clsx('w-full', errors.postId && 'border-red-500', '')}
						/>
						{errors.name && <span className="text-red-500">{errors.postId}</span>}
						<TextField
							name="address"
							type="text"
							value={formData.address ?? ''}
							onChange={handleInputChange}
							placeholder={'آدرس پستی'}
							className={clsx('w-full', errors.address && 'border-red-500', '')}
						/>
						{errors.name && <span className="text-red-500">{errors.address}</span>}
						<button
							className="text-right text-sm cursor-pointer underline px-1 "
							onClick={handleClick}
							role="button"
						></button>
						{/* <Button disabled={Object.keys(errors).length > 0} /> */}
						<PaymentBtn
							url={'/checkout/confirm'}
							className={'!btn-success !text-white'}
							text="تکمیل فرایند خرید"
							disabled={Object.keys(errors).length > 0}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
