import React from 'react'

export const Breadcrumbs = () => {
  return (
    <div className=" h-16 pr-2 pb-1">
      <div className="flex flex-col justify-center mr-2">
        <b className="">دفاتر</b>
        <p className="text-[10px]">(5,074 محصول)</p>
      </div>
      <div className="text-[10px] breadcrumbs">
        <ul>
          <li>
            <a>خانه</a>
          </li>
          <li>
            <a>محصولات</a>
          </li>
          <li>کتاب ها</li>
        </ul>
      </div>
    </div>
  );
}
