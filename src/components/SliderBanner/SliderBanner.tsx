import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import BannerLayout from '../Sliders/BannerLayout';
type SliderData = { name: string; rightButton: boolean; color: string };
interface SliderProps {
  data: SliderData[];
  className?: string;
  title?: string;
}

export default function SliderBanner({ data, className }: SliderProps) {
  return (
    <BannerLayout
      className={className}
      content={data.map((dataItem: SliderData, index: number) => {
        console.log(`text-${dataItem.color}-500`); // Check color value

        return (
          <div className="w-full md:h-full h-28 mt-5" key={index}>
            <span
              className={clsx(
                `absolute text-[10px] md:top-[23%] top-[30%] flex flex-col justify-between items-center gap-2`,
                `${dataItem.rightButton ? 'left-[50%]' : 'right-[50%]'} `
              )}
            >
              <div className="w-[50%]">
                <Image
                  className="w-full "
                  src={`/images/banner/${dataItem.name}-logo.svg`}
                  alt={`Banner Image ${dataItem.name}`}
                  height={1500}
                  width={1000}
                  quality={100}
                />
              </div>

              <div className="flex justify-center items-center px-2 py-[2px] md:px-3 md:py-1 bg-white opacity-85 rounded-full ">
                <b
                  className={clsx(
                    `text-right`,
                    `text-${dataItem.color}-500`,
                    `text-[8px] md:text-[18px] text-center`
                  )}
                >
                  {dataItem.name} انواع محصولات برند
                </b>
              </div>
              <Link href={'#'} className="">
                <span className="flex justify-center items-center px-[7px] py-[2px] bg-white opacity-85 rounded-full text-[6px] md:text-[11px]">
                  <AiOutlineLeft />
                  مشاهده
                </span>
              </Link>
            </span>
            <Image
              className="size-full object-cover rounded-lg"
              src={`/images/banner/${dataItem.name}-banner.svg`}
              alt={`Banner Image ${dataItem.name}`}
              width={1000}
              height={1500}
              quality={100}
            />
          </div>
        );
      })}
    />
  );
}
