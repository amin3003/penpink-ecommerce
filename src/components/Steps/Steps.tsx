import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const Steps = (props: { serverPathname: string }) => {
  const data = [
    {
      name: 'انتخاب ادرس',
      url: '/checkout/ShippingAddress',
      check:
        props.serverPathname === 'ShippingAddress' ||
        props.serverPathname === 'confirm' ||
        props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'بازبینی ',
      url: '/checkout/confirm',
      check:
        props.serverPathname === 'confirm' ||
        props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'پرداخت',
      url: '/checkout/PaymentCheck',
      check: props.serverPathname === 'PaymentCheck',
    },
    {
      name: 'اتمام فرایند خرید',
      check: false,
    },
  ];

  return (
    <ul className="steps my-4 mx-3">
      {data.map((item: any, index) => (
        <li
          key={index}
          className={clsx(
            `step text-[12px] md:text-md`,
            item.check ? 'step-primary' : null
          )}
        >
          {item.url ? <Link href={item.url}>{item.name}</Link> : item.name}
        </li>
      ))}
    </ul>
  );
};
