'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import Button from '../Button/Button';
import Azfetch, { AzFetch, AzNextHelper } from '@azrico/fetch';
import { entries_to_object } from '@azrico/object';

export default function LoginDialogContent() {
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

	const handleSubmit = async (fd: FormData) => {
		const formObject = entries_to_object(Array.from(fd.entries()));
		const res = await Azfetch.post('@/api/auth', { ...formObject });
		console.log(res);
		//
		ref.current?.reset();
		setFormData({});
	};

	const isValidEmail = (email: string) => {
		// Email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	useEffect(() => {
		// Validation
		const newErrors: Partial<any> = {};
		if (formData.fullname != undefined && formData.fullname.trim() === '') {
			newErrors.fullname = 'نام و نام خانوادگی خود را وارد کنید ';
		}
		if (formData.email != undefined) {
			if (formData.email.trim() === '') {
				newErrors.email = 'ایمیل خود را وارد کنید';
			} else if (!isValidEmail(formData.email)) {
				newErrors.email = 'ایمیل وارد شده اشتباه میباشد';
			}
		}
		if (formData.password != undefined && formData.password.trim() === '') {
			newErrors.password = 'پسورد وارد شده اشتباه میباشد';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			setErrors({});
		}
	}, [formData]);

	return (
		<div className="" dir="rtl">
			<div className="mt-5">
				<h3 className="font-bold text-xl md:text-3xl text-center m-0 mb-5">
					{login ? 'ورود' : 'ثبت نام'}
				</h3>
				<p className="mb-6 text-xs text-center">لطفا اطلاعات خواسته شده را وارد کنید</p>
				<form
					ref={ref}
					action={async (fd: FormData) => {
						await handleSubmit(fd);
						ref.current?.reset();
					}}
					id="contact-form"
					name="contact-form"
					className={clsx('flex flex-row')}
				>
					<div className="gap-4 flex flex-col flex-[4]">
						{!login && (
							<TextField
								name="fullname"
								type="text"
								value={formData.fullname ?? ''}
								onChange={handleInputChange}
								placeholder={'نام و نام خانوادگی'}
								className={clsx('w-full', errors.fullname && 'border-red-500', '')}
							/>
						)}
						{errors.fullname && <span className="text-red-500">{errors.fullname}</span>}

						<TextField
							name="email"
							type="email"
							value={formData.email ?? ''}
							onChange={handleInputChange}
							placeholder={'ایمیل'}
							className={clsx('w-full', errors.email && 'border-red-500')}
						/>
						{errors.email && <span className="text-red-500">{errors.email}</span>}
						<TextField
							name="password"
							type="password"
							value={formData.password ?? ''}
							onChange={handleInputChange}
							placeholder={'رمز ورود'}
							label={login ? 'رمزتان را فراموش کردید؟' : ''}
							className={clsx('w-full', errors.email && 'border-red-500')}
						/>
						{errors.password && <span className="text-red-500">{errors.password}</span>}
						<button
							className="text-right text-sm cursor-pointer underline px-1 "
							onClick={handleClick}
							role="button"
						>
							<b className="text-xs">
								{login ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'برای ورود کلیک کنید '}
							</b>
						</button>

						<Button disabled={Object.keys(errors).length > 0} />
					</div>
				</form>
			</div>
		</div>
	);
}
