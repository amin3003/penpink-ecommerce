import React from 'react';

export const FreqQuestions = (props: {}) => {
  const data = [
    {
      title: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
      desc: 'برای ثبت سفارش، کافی است محصول مورد نظر خود را به سبد خرید اضافه کنید و سپس آدرس خود را وارد نمایید. در مرحله آخر به صفحه پرداخت هدایت می‌شوید که می‌توانید از طریق کارت به کارت مبلغ را واریز کنید.',
    },
    {
      title: 'آیا نیاز به ساخت حساب کاربری دارم؟',
      desc: 'خیر، برای خرید از سایت ما نیازی به ساخت حساب کاربری ندارید و می‌توانید به صورت مهمان خرید کنید.',
    },
    {
      title: 'چگونه می‌توانم مبلغ سفارش را پرداخت کنم؟',
      desc: 'پس از ثبت سفارش و وارد کردن آدرس، به صفحه‌ای هدایت می‌شوید که اطلاعات مربوط به کارت به کارت را مشاهده خواهید کرد. می‌توانید مبلغ را از طریق کارت به کارت واریز نمایید.',
    },
    {
      title: 'مدت زمان تحویل سفارش چقدر است؟',
      desc: 'مدت زمان تحویل سفارش‌ها بسته به محل شما ممکن است متفاوت باشد، اما به طور معمول بین ۲ تا ۵ روز کاری زمان می‌برد.',
    },
  ];
  return (
    <div className='w-full flex flex-col gap-5 items-center justify-center'>
      <b className="md:text-xl text-sm">سولات متداول</b>
      <div className="w-[80%] bg-primary p-4 rounded-xl gap-3 mx-auto">
        {data.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 my-3"
            >
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-justify text-[12px] leading-4 md:text-[16px] font-medium">
                {item.title}
              </div>
              <div className="collapse-content">
                <p className="md:text-[12px] text-[10px] leading-5 text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
