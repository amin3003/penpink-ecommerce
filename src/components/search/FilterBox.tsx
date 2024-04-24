import React from 'react';
import { Accordion } from '../Accordion/Accordion';

export const FilterBox = () => {
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
    <div className="">
      <div className="form-control bg-white rounded-xl p-[10px] my-3">
        <label className="flex items-center justify-center cursor-pointer label gap-5">
          <span className="label-text text-sm">نمایش کالا های موجود</span>
          <input type="checkbox" className="toggle toggle-secondary" checked />
        </label>
      </div>
      <div className=" bg-white rounded-md">
        <Accordion data={data} />
      </div>
    </div>
  );
};
