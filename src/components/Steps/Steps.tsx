import clsx from 'clsx';
import React from 'react';

export const Steps = (props: { serverPathname: string }) => {
  const data = [
    {
      name: 'انتخاب ادرس',
      check:
        props.serverPathname === 'ShippingAddress' ||
        props.serverPathname === 'confirm' ||
        props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'بازبینی ',
      check:
        props.serverPathname === 'confirm' ||
        props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'پرداخت',
      check: props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'اتمام فرایند خرید',
      check: false,
    },
  ];
  return (
    <ul className="steps my-4 mx-3">
      {data.map((item, index) => {
        return (
          <li
            key={index}
            className={clsx(
              `step text-[12px] md:text-md`,
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
