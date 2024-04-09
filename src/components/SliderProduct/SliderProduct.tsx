// SliderProduct.tsx
import Image from 'next/image';
import SwiperLayout from '../Sliders/SwiperLayout';
import { CardProduct } from '../CardProduct/CardProduct';

interface SliderProductProps {
  data: any[];
  className?: string;
  title?: string;
}

export default function SliderProduct(props: SliderProductProps) {
  return (
    <>
      <div className="mx-5 flex flex-col gap-2 justify-center"  dir='rtl'>
        <span className="flex gap-2 items-center">
          <i className="bi bi-circle-fill"></i>
          <ul>
            <li>{props.title}</li>
          </ul>
        </span>
        <hr className="w-full my-2 border-gray-300" />
      </div>
      <SwiperLayout
        className={props.className}
        content={props.data.map((r: any, index: any) => {
          return (
            <CardProduct
              off={r.off}
              name={r.name}
              title={r.title}
              desc={r.desc}
              Price={r.Price}
              firstPrice={r.firstPrice}
            />
          );
        })}
      />
    </>
  );
}
