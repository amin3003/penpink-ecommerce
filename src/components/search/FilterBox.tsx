import React from 'react';
import { Accordion } from '../Accordion/Accordion';
import clsx from 'clsx';

export const FilterBox = (props: { className: any; accordionClass :any}) => {
  const data = [
    {
      title: '1 title',
      content: [
        { desc: 'Eiusmod dolore ' },
        { desc: 'Aliquip' },
        { desc: 'Fugiat' },
      ],
    },
    {
      title: '2 title',
      content: [
        { desc: 'Eiusmod' },
        { desc: 'Aliquip qui' },
        { desc: 'Fugiat' },
      ],
    },
    {
      title: '3 title',
      content: [{ desc: 'Eiusmod' }, { desc: 'Aliquip' }, { desc: 'Fugiat' }],
    },
    {
      title: '4 title',
      content: [
        { desc: 'Eiusmod' },
        { desc: 'Aliquip qui' },
        { desc: 'Fugiat' },
      ],
    },
    {
      title: '5 title',
      content: [{ desc: 'Eiusmod' }, { desc: 'Aliquip' }, { desc: 'Fugiat' }],
    },
    {
      title: '6 title',
      content: [
        { desc: 'Eiusmod' },
        { desc: 'Aliquip qui' },
        { desc: 'Fugiat' },
      ],
    },
    {
      title: '7 title',
      content: [
        { desc: 'Eiusmod' },
        { desc: 'Aliquip qui' },
        { desc: 'Fugiat' },
      ],
    },
  ];

  return (
    <div>
      <div
        className={clsx(
          `form-control rounded-xl p-[0] lg:p-[0] my-3 w-full`,
          props.className
        )}
      >
        <label className="flex items-center rounded-xl p-3 w-full justify-center md:justify-start cursor-pointer bg-base-100 label gap-0 lg:gap-4">
          <span className="label-text text-[13px] font-bold w-full text-start">
            نمایش کالا های موجود
          </span>
          <input
            type="checkbox"
            className="toggle toggle-secondary w-12 h-5"
            checked
          />
        </label>
      </div>
      <div className={clsx('bg-white rounded-md', props.className)}>
        <Accordion data={data} className={props.accordionClass} />
      </div>
    </div>
  );
};
