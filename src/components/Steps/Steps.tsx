import clsx from 'clsx';
import React from 'react';

export const Steps = () => {
  const data = [
    { name: 'ثبت نام', check: true },
    { name: 'انتخاب ادرس', check: true },
    { name: 'بازبینی پرداخت', check: false },
    { name: 'اتمام فرایند خرید', check: false },
  ];
  return (
    <ul className="steps my-4">
      {data.map((item, index) => {
        return <li key={index} className={clsx(`step  text-xs md:text-md` , item.check ? "step-primary" : null)}>{item.name}</li>;
      })}
    </ul>
  );
};
