'use client';
import React from 'react';
import { Selector } from '../Selector/Selector';
import TextField from './TextField';
import { getServerSearchParams } from '@/navigation';
import clsx from 'clsx';
import { AddBtn } from '../Customer/AddBtn';

export const AddressesForm = (props: { addressObject: any }) => {
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
  //  const sp = getServerSearchParams();
  //  const fieldsWithError = Object.fromEntries(
  //    sp.getAll('error').map((r) => [r, 'مقدار نامعتبر'])
  //  );

  const { addressObject } = props;
  return (
    <form id="address-form" className="px-3 py-5 mt-2" dir="rtl">
      <div className="flex flex-col justify-center gap-2">
        <span className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <TextField
            defaultValue={addressObject['name']}
            // errors={fieldsWithError}
            name="name"
            type="text"
            placeholder={'نام'}
            wrapperClassName={'w-full'}
            inputClass={'!w-full'}
            className={clsx('w-full')}
          />
          <TextField
            defaultValue={addressObject['lastname']}
            // errors={fieldsWithError}
            name="lastname"
            type="text"
            placeholder={'نام خانوادگی'}
            wrapperClassName={'w-full'}
            inputClass={'!w-full'}
            className={clsx('w-full ')}
          />
        </span>
        <span className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <TextField
            defaultValue={addressObject['phone']}
            //   errors={fieldsWithError}
            name="phone"
            type="phone"
            placeholder={'شماره تلفن'}
            wrapperClassName={'w-full'}
            inputClass={'w-[50%]'}
            className={clsx('w-full')}
          />
          <TextField
            defaultValue={addressObject['email']}
            //   errors={fieldsWithError}
            name="email"
            type="email"
            placeholder={'ایمیل'}
            wrapperClassName={'w-full'}
            inputClass={'w-[50%]'}
            className={clsx('w-full')}
          />
        </span>
        <p className="text-[12px] text-justify">
          در وارد کردن شماره تلفن دقت نمایید,زیرا کلیه موارد خرید و ارسال کالا
          از طریق پیامک به اطلاع شما خواهد رسید.
        </p>
        <span className="flex flex-col md:flex-row mb-2 justify-between gap-4 w-full">
          <span className="flex flex-row justify-between gap-4 w-full">
            <Selector
              defaultValue={addressObject['ostan']}
              name="ostan"
              label="استان"
              optionData={ostanList}
              className={clsx('aria-[errormessage]:border-red-500 w-full')}
              wrapperClassName={'!w-[50%]'}
              // errors={errors?.ostan}
            />
            <Selector
              defaultValue={addressObject['city']}
              name="city"
              label="شهر"
              optionData={cityList}
              className={clsx('aria-[errormessage]:border-red-500 w-full')}
              wrapperClassName={'!w-[50%]'}
              // errors={errors?.city}
            />
          </span>
          <TextField
            defaultValue={addressObject['postCode']}
            //   errors={fieldsWithError}
            name="postCode"
            type="number"
            placeholder={'کد پستی'}
            wrapperClassName={'w-full'}
            inputClass={'w-[100%]'}
            className={clsx('w-full')}
          />
        </span>

        <TextField
          defaultValue={addressObject['address']}
          //   errors={fieldsWithError}
          name="address"
          type="text"
          placeholder={'آدرس پستی'}
          wrapperClassName={'w-full mt-0'}
          inputClass={'w-[50%]'}
          className={clsx('w-full ')}
        />
      </div>
      <span className="w-full flex justify-end">
        <button className="btn btn-primary  flex gap-2 justify-center">
          افزودن آدرس
          <i className="bi bi-caret-left-fill" />
        </button>
      </span>
    </form>
  );
};
