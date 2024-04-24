import React from 'react'
import { GoChevronRight } from 'react-icons/go';
import { GoChevronLeft } from 'react-icons/go';

export const Pagination = () => {
  return (
    <>
      <div className="hidden lg:flex join mt-5 mx-auto">
        <button className="join-item btn ">
          <GoChevronRight />
          صفحه قبل
        </button>
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
        <button className="join-item btn">
          صفحه بعد
          <GoChevronLeft />
        </button>
      </div>
    </>
  );
}
