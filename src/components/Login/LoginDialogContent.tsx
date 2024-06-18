'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import loginAction from './loginAction';
import { useFormState, useFormStatus } from 'react-dom';
import SubmitButton from '../SubmitButton/SubmitButton'; 
import { useRouter } from '@/navigation';

export default function LoginDialogContent() {
	const { pending } = useFormStatus();
	const router = useRouter();

	const [formState, formAction] = useFormState(async (p: any, fd: FormData) => {
		const res = await loginAction(fd);
		if (!res.error && res.message) router.refresh();
		return res;
	}, {});

	const [login, setLogin] = useState<boolean>(true);
	const handleClick = () => {
		setLogin((prevValue) => !prevValue);
	};

	return (
		<div className="" dir="rtl">
			<div className="mt-5">
				<h3 className="font-bold text-xl md:text-3xl text-center m-0 mb-5">
					{login ? 'ورود' : 'ثبت نام'}
				</h3>
				{!pending && (
					<>
						{Boolean(formState.error) && (
							<p className="mb-6 text-md text-center text-error">{formState.error}</p>
						)}
						{Boolean(formState.message) && (
							<p className="mb-6 text-md text-center">{formState.message}</p>
						)}
					</>
				)}
				<p className="mb-6 text-xs text-center">لطفا اطلاعات خواسته شده را وارد کنید</p>
				<form action={formAction} className={clsx('flex flex-row')}>
					<div className="gap-4 flex flex-col flex-[4]">
						{login ? <LoginForm /> : <RegisterForm />}
						<input name="isLogin" defaultValue={login ? 1 : 0} hidden></input>
						<button
							type="button"
							className="text-right text-sm cursor-pointer underline px-1 "
							onClick={handleClick}
						>
							<b className="text-xs">
								{login ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'برای ورود کلیک کنید '}
							</b>
						</button>

						<SubmitButton>{login ? 'ورود' : 'ثبت نام'}</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	);
}
function RegisterForm() {
	const fields = {
		fullname: 'نام و نام خوانوادگی',
		email: 'ایمیل',
		username: 'نام کاربری',
		password: 'رمز ورود',
	};
	return (
		<>
			{Object.entries(fields).map((r, i) => {
				return (
					<TextField
						key={r[0]}
						name={r[0]}
						type="text"
						placeholder={r[1]}
						className={clsx('w-full')}
					/>
				);
			})}
		</>
	);
}
function LoginForm() {
	const fields = {
		email: 'ایمیل یا نام کاربری',
		password: 'رمز ورود',
	};
	return (
		<>
			{Object.entries(fields).map((r, i) => {
				return (
					<TextField
						key={r[0]}
						name={r[0]}
						type={r[0] === 'password' ? 'password' : 'text'}
						placeholder={r[1]}
						className={clsx('w-full')}
					/>
				);
			})}
		</>
	);
}
