// SliderBanner.tsx
import Image from 'next/image';
import BannerLayout from '../Sliders/BannerLayout';
import Link from 'next/link';
import clsx from 'clsx';
type SliderData = { name: string; rightButton: boolean };
interface SliderProps {
  data: SliderData[];
  className?: string;
  title?: string;
}

export default function SliderBanner({ data, className }: SliderProps) {
  return (
    <BannerLayout
      className={className}
      content={data.map((data: SliderData, index: number) => {
        console.log(index);

        return (
          <div className="w-full md:h-full h-28" key={index}>
            <span
              className={clsx(
                `absolute text-[10px] top-[20%] flex flex-col justify-between items-center gap-2`,
                `${data.rightButton ? 'left-[50%]' : 'right-[50%]'} `
              )}
            >
              <div className="w-[50%] h-[50%]">
                <Image
                  className="w-full "
                  src={`/images/banner/${data.name}.png`}
                  alt={`Banner Image ${data.name}`}
                  height={1500}
                  width={1000}
                  quality={100}
                />
              </div>
              <div className="px-[3px] bg-white opacity-85 rounded-xl text-center">
                <p>مشاهده برند {data.name}</p>
              </div>
              <Link
                href={'#'}
                className="px-[3px] bg-white opacity-85 rounded-xl text-center"
              >
                مشاهده
              </Link>
            </span>
            <Image
              className="size-full object-cover rounded-lg"
              src={`/images/banner/${data.name}.svg`}
              alt={`Banner Image ${data.name}`}
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
