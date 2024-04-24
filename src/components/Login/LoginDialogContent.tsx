'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import { submitRequest, CustomFormData } from '@/../action/formAction';
import Button from '../Button/Button';

export default function LoginDialogContent() {
	const ref = useRef<HTMLFormElement>(null);

	const [formData, setFormData] = useState<any>({});

	const [errors, setErrors] = useState<Partial<CustomFormData>>({});

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
		/*
		we are actually not using the `FormData State`
		we use `fd: FormData` that the <form> sends us
		the `FormData State` is only used for error handling
		*/
		await submitRequest({
			fullname: String(fd.get('fullname')),
			email: String(fd.get('email')),
			password: String(fd.get('password')),
		});
		ref.current?.reset();
		setFormData({});
	};

	const isValidEmail = (email: string) => {
		// Email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// const isValidEmail = setTimeout((email: string) => {
	//   // Email validation regex
	//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	//   return emailRegex.test(email);
	// },3000)

	useEffect(() => {
		// Validation
		const newErrors: Partial<CustomFormData> = {};
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
				<p className="mb-8">
					سلام!
					<br />
					لطفا اطلاعات خواسته شده را وارد کنید
				</p>
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
							className="text-right text-sm cursor-pointer"
							onClick={handleClick}
							role="button"
						>
							{login ? ' حساب کاربری ندارم !!' : 'حساب کاربری دارم !!'}
						</button>

						<Button disabled={Object.keys(errors).length > 0} />
					</div>
				</form>
			</div>
		</div>
	);
}
