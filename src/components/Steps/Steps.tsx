import clsx from 'clsx';
import React from 'react';

export const Steps = (props: { serverPathname: string }) => {
  const data = [
    // { name: 'ثبت نام', check: true },
    {
      name: 'انتخاب ادرس',
      check: props.serverPathname === 'ShippingAddress' ? true : false,
    },
    {
      name: 'بازبینی ',
      check: props.serverPathname === 'confirm' ? true : false,
    },
    {
      name: 'پرداخت',
      check: props.serverPathname === 'paymentCheck' ? true : false,
    },
    {
      name: 'اتمام فرایند خرید',
      check: false,
    },
  ];
  return (
    <ul className="steps my-4">
      {data.map((item, index) => {
        return (
          <li
            key={index}
            className={clsx(
              `step text-xs md:text-md`,
              item.check ? 'step-primary' : null
            )}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
