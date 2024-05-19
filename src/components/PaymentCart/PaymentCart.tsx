import React from 'react';

export const PaymentCart = () => {
      const condition = true;
  return (
    <>
      <div className="flex flex-col w-full lg:w-[30%] lg:h-[70vh] !sticky !top-2 !z-10">
        {/* <span>سبد کالا</span> */}
        <div className="flex flex-col justify-around items-start bg-base-100 !rounded-xl p-10 md:h-[50vh] gap-3 ">
          <span className="flex flex-col gap-4 w-full">
            <div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
              <p className=" font-thin">جمع مبلغ کالاها:</p>
              <p className=" font-thin">24,000 تومان</p>
            </div>
            <div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
              <p className="font-thin">سود شما از این خرید:</p>
              <p className=" font-thin">1,000 تومان</p>
            </div>
          </span>
          <div className="divider !divide-dashed"></div>
          <div className="flex flex-col text-justify w-full gap-2 !my-2 text-sm">
            {condition && (
              <p className="text-[10px] font-thin">
                هزینه ارسال در ادامه بر اساس آدرس و نحوه‌ی ارسال محاسبه و اضافه
                خواهد شد
              </p>
            )}
            <div className="flex justify-between w-full gap-2 my-2 text-sm font-bold text-[12px] md:text-[14px]">
              <p className="!text-center">جمع سبد خرید:</p>
              <p className="text-justify">25,000 تومان</p>
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn btn-success w-full text-white mt-3">
            تکمیل فرایند خرید{' '}
          </button>
        </div>
      </div>
    </>
  );
};
