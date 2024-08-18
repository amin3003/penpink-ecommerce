import React from 'react';
import clsx from 'clsx';
import { Selector } from '../Selector/Selector'; // Make sure this is the correct path
import TextField from './TextField'; // Make sure this is the correct path
import Calender from './Calender';

export const InfoForm = (props: { infoObject: any; errors?: any }) => {
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

  // Uncomment and define error handling logic as needed
  // const sp = getServerSearchParams();
  // const fieldsWithError = Object.fromEntries(
  //   sp.getAll('error').map((r) => [r, 'مقدار نامعتبر'])
  // );

  const { infoObject, errors } = props;

  return (
    <form id="info-form" className="px-3 py-5 mt-2" dir="rtl">
      <div className="flex flex-col justify-center gap-2">
        <span className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <TextField
            defaultValue={infoObject['name']}
            name="name"
            type="text"
            placeholder={'نام'}
            wrapperClassName={'w-full'}
            inputClass={'!w-full'}
            className={clsx('w-full')}
            // errors={errors?.name}
          />
          <TextField
            defaultValue={infoObject['lastname']}
            name="lastname"
            type="text"
            placeholder={'نام خانوادگی'}
            wrapperClassName={'w-full'}
            inputClass={'!w-full'}
            className={clsx('w-full ')}
            // errors={errors?.lastname}
          />
        </span>
        <span className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <TextField
            defaultValue={infoObject['phone']}
            name="phone"
            type="tel"
            placeholder={'شماره تلفن'}
            wrapperClassName={'w-full'}
            inputClass={'w-[50%]'}
            className={clsx('w-full')}
            // errors={errors?.phone}
          />
          <TextField
            defaultValue={infoObject['email']}
            name="email"
            type="email"
            placeholder={'ایمیل'}
            wrapperClassName={'w-full'}
            inputClass={'w-[50%]'}
            className={clsx('w-full')}
            // errors={errors?.email}
          />
        </span>
          <Calender
            placeholder={'تاریخ تولد'}
            // errors={errors?.phone}
          />
        <span className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <div className="flex flex-row items-center justify-center gap-3 mb-3 md:gap-10 w-full">
            <label className="block  text-xs font-thin">جنسیت</label>

            <div className="flex flex-row gap-3 items-center justify-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="مرد"
                  checked={infoObject['sex'] === 'مرد'}
                  className="radio radio-secondary text-center input-xs h-[1rem] w-[1rem] m-0 p-0"
                  // onChange={handleSexChange}
                />
                <span className="mr-2 text-xs font-thin">مرد</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="زن"
                  checked={infoObject['sex'] === 'زن'}
                  className="radio radio-secondary text-center input-xs h-[1rem] w-[1rem] m-0 p-0"
                  // onChange={handleSexChange}
                />
                <span className="mr-2 text-xs font-thin">زن</span>
              </label>
            </div>

            {/* Uncomment if you handle errors for sex */}
            {/* {errors?.sex && <p className="text-red-500 text-xs">{errors.sex}</p>} */}
          </div>
        </span>
        <span className="flex flex-row justify-between gap-4 w-full">
          <Selector
            defaultValue={infoObject['ostan']}
            name="ostan"
            label="استان"
            optionData={ostanList}
            className={clsx('aria-[errormessage]:border-red-500 w-full')}
            wrapperClassName={'!w-[50%]'}
            // errors={errors?.ostan}
          />
          <Selector
            defaultValue={infoObject['city']}
            name="city"
            label="شهر"
            optionData={cityList}
            className={clsx('aria-[errormessage]:border-red-500 w-full')}
            wrapperClassName={'!w-[50%]'}
            // errors={errors?.city}
          />
        </span>
        <TextField
          defaultValue={infoObject['idNumber']}
          name="idNumber"
          type="text"
          placeholder={'شماره ملی'}
          wrapperClassName={'w-full mt-5'}
          inputClass={'w-[50%]'}
          className={clsx('w-full')}
          // errors={errors?.idNumber}
        />
      </div>
      <span className="w-full flex  justify-center items-center md:justify-start flex-row-reverse gap-4 mt-4">
        <button className="btn btn-primary flex gap-2 justify-center flex-row font-normal text-xs md:text-sm btn-xs md:btn-md">
          ذخیره اطلاعات
          <i className="bi bi-caret-left-fill" />
        </button>
        <button className="btn btn-outline border-none font-normal text-xs md:text-sm btn-error btn-xs md:btn-md">
          لغو ویرایش
        </button>
      </span>
    </form>
  );
};
