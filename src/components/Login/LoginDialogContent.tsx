'use client';
import React, { useState } from 'react';
import TextField from '../TextField/TextField';
import clsx from 'clsx';
import loginAction from './loginAction';
import { useFormState, useFormStatus } from 'react-dom';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useRouter } from '@/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginDialogContent() {
  const { pending } = useFormStatus();
  const router = useRouter();

  const [formState, formAction] = useFormState(async (p: any, fd: FormData) => {
    const res = await loginAction(fd);
    if (!res.error && res.message) router.refresh();
    return res;
  }, {});

  const [login, setLogin] = useState<boolean>(true); // True for Login, False for Register
  const [passwordVisibility, setPasswordVisibility] = useState<any>({
    password: false,
    confirmPassword: false,
  });

  const handleClick = (isLogin: boolean) => {
    setLogin(isLogin);
  };

  const togglePasswordVisibility = (field: string) => {
    setPasswordVisibility((prevState: any) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const fields = login
    ? {
        email: 'ایمیل',
        password: 'رمز ورود',
      }
    : {
        email: 'ایمیل',
        password: 'رمز ورود',
        confirmPassword: 'تکرار رمز ورود',
      };

  return (
    <div className="" dir="rtl">
      <div className="">
        <div className="flex justify-around items-center md:mb-1 mb-5">
          <span
            className={clsx(
              ' px-5 py-2 right-0 rounded-md',
              login
                ? 'bg-white shadow-lg text-gray'
                : 'opacity-50'
            )}
          >
            <button
              type="button"
              className="m-0 cursor-pointer"
              onClick={() => handleClick(true)}
            >
              <p className="text-xs md:text-sm ">ورود به سایت</p>
            </button>
          </span>
          <span
            className={clsx(
              ' px-5 py-2 left-0 rounded-md w-max',
              !login ? 'text-black shadow-md' : 'opacity-50'
            )}
          >
            <button
              type="button"
              className="m-0 cursor-pointer"
              onClick={() => handleClick(false)}
            >
              <p className="text-xs md:text-sm">عضویت در سایت</p>
            </button>
          </span>
        </div>
        <div className="flex flex-col gap-1 shadow-md px-5 pb-5 rounded-xl">
          <Image
            src={'/images/user-avatar.svg'}
            alt="profile"
            width={73}
            height={73}
            className=" mx-auto mb-4"
          />
          {!pending && (
            <>
              {Boolean(formState.error) && (
                <p className="mb-6 text-md text-center text-error">
                  حساب کاربری پیدا نشد
                </p>
              )}
              {Boolean(formState.message) && (
                <p className="mb-6 text-md text-center">{formState.message}</p>
              )}
            </>
          )}
          <form action={formAction} className={clsx('flex flex-row')}>
            <div className="gap-2 flex flex-col flex-[4]">
              {Object.entries(fields).map(([name, placeholder]) => {
                const isPassword =
                  name === 'password' || name === 'confirmPassword';
                return (
                  <div key={name} className="relative w-full mb-2">
                    <TextField
                      id={`input-${name}`}
                      name={name}
                      type={passwordVisibility[name] ? 'text' : 'password'}
                      placeholder={placeholder}
                      className="w-full pl-10"
                    />
                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(name)}
                        className="absolute inset-y-0 left-2 -top-3 flex items-center justify-center text-gray-500"
                      >
                        <i
                          id={`icon-${name}`}
                          className={`bi bi-eye${passwordVisibility[name] ? '-slash' : ''} w-5 h-5`}
                        ></i>
                      </button>
                    )}
                  </div>
                );
              })}
              <input name="isLogin" defaultValue={login ? 1 : 0} hidden></input>
              {!login && (
                <label className="text-xs mb-3 text-justify">
                  <input type="checkbox" className="accent-pink-500 mr-2" />{' '}
                  <Link href={'/'} className="underline text-primary">
                    شرایط و قوانین
                  </Link>{' '}
                  استفاده از سایت pen pink را مطالعه نموده و با کلیه موارد آن
                  موافقم.
                </label>
              )}
              <SubmitButton>{login ? 'ورود' : 'ثبت نام'}</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
