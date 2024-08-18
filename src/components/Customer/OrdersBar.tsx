'use client';

import React, { useState } from 'react';

const orderStatus = [
  { label: 'پرداخت ناموفق', count: 0 },
  { label: 'در حال پردازش', count: 0 },
  { label: 'ارسال شده ها', count: 0 },
  { label: 'لغو شده ها', count: 0 },
];

const orderCategories = [
  { label: 'آخرین سفارش ها', count: 0 },
  { label: 'آخرین محصولات ذخیره شده', count: 0 },
];

interface OrdersBarProps {
  useCategories?: boolean; // Optional prop with default value false
}

const OrdersBar: React.FC<OrdersBarProps> = ({ useCategories = false }) => {
  const [activeItem, setActiveItem] = useState(
    useCategories ? orderCategories[0] : orderStatus[2]
  );

  const handleItemClick = (item: any) => {
    setActiveItem(item);
  };

  const items = useCategories ? orderCategories : orderStatus;

  return (
    <div>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-xl w-full mt-3 gap-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              onClick={() => handleItemClick(item)}
              className={activeItem.label === item.label ? 'active' : ''}
            >
              <p className="text-xs font-thin opacity-70">{item.label}</p>
              <span className="badge badge-sm">{item.count}</span>
            </a>
          </li>
        ))}
      </ul>

      {activeItem && (
        <div className="flex flex-col justify-center items-center mt-5 bg-white p-4 rounded-lg border-dashed border-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
          >
            <path
              d="M14.8323 44.1052L93.1651 29.6021L106.815 103.327L28.4823 117.83L14.8323 44.1052Z"
              fill="#B3B9BF"
            ></path>
            <path
              d="M29.8665 22.2656L14.843 44.1164L44.8008 38.5688L93.1969 29.6086L108.22 7.75781L29.8665 22.2656Z"
              fill="#C0C2C9"
            ></path>
            <path
              d="M108.22 7.75781L93.1965 29.6086L106.851 103.355L121.875 81.5039L108.22 7.75781Z"
              fill="#A6ABB3"
            ></path>
            <path
              d="M44.7856 38.5598L63.2169 35.1473L68.7622 65.0981L50.331 68.5106L44.7856 38.5598Z"
              fill="#9BA1A8"
            ></path>
            <path
              d="M63.2391 35.1539L44.8008 38.5687L59.8242 16.7179L78.2625 13.3054L63.2391 35.1539Z"
              fill="#9BA1A8"
            ></path>
            <path
              d="M21.0938 21.0938H16.4062C16.4062 12.0492 23.7656 4.6875 32.8125 4.6875H35.1562V9.375H32.8125C26.3508 9.375 21.0938 14.632 21.0938 21.0938Z"
              fill="#9BA1A8"
            ></path>
            <path
              d="M111.875 135.312H109.531V130.625H111.875C118.337 130.625 123.594 125.368 123.594 118.906H128.281C128.281 127.951 120.922 135.312 111.875 135.312Z"
              fill="#9BA1A8"
            ></path>
            <path
              d="M104.844 128.281H102.5V123.594H104.844C111.305 123.594 116.562 118.337 116.562 111.875H121.25C121.25 120.92 113.891 128.281 104.844 128.281Z"
              fill="#9BA1A8"
            ></path>
          </svg>
          <b> سفارشی موجود نیست!</b>
        </div>
      )}
    </div>
  );
};

export default OrdersBar;
