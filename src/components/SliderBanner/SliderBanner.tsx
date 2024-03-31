// SliderBanner.tsx
import Image from 'next/image';
import BannerLayout from '../Sliders/BannerLayout';

interface SliderBannerProps {
  data: string[];
  classNameName?: string;
}

export default function SliderBanner({
  data,
  classNameName,
}: SliderBannerProps) {
  return (
    <BannerLayout
      className={classNameName}
      content={data.map((name: string, index: number) => {
        return (
          <div className="w-full py-4" key={index}>
            <Image
              className="size-full object-cover rounded-lg"
              src={`/images/banner/${name}.svg`}
              alt={`Banner Image ${name}`}
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
