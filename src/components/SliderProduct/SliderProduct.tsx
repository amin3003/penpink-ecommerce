import Image from 'next/image';
import SwiperLayout from '../Sliders/SwiperLayout';
import clsx from 'clsx';

export default function SliderProduct(props: {
  data: any[];
  classNameName?: string;
}) {
  return (
    <SwiperLayout
      className={props.classNameName}
      content={props.data.map((r: any, index: any) => {
        return (
          <>
            <div className="card w-96 glass" dir="rtl">
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="car!"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">کتاب ریاضی هفتم</h2>
                <p>کتاب ریاضی هفتم سر تا پیاز گاج</p>
                <div className="card-actions justify-end text-justify">
                  <p className="">60,000 تومان</p>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <span className="flex flex-row gap-2">
                    <div className="badge badge-secondary ">20%</div>
                    <p className="line-through">99,000</p>
                  </span>
                  <button className="text-[30px]">
                    <i className="bi bi-cart-plus-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    />
  );
}
