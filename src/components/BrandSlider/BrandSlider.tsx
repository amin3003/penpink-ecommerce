import React from 'react';
import SwiperLayout from '../Sliders/SwiperLayout';
import Image from 'next/image';

export const BrandSlider = () => {
const data = [
  { title: 'FaberCastell' },
  { title: 'Staedtler' },
  { title: 'Pentel' },
  { title: 'Maped' },
  { title: 'BIC' },
  { title: 'Lamy' },
  { title: 'Pilot' },
  { title: 'UniBall' },
  { title: 'Rifle' },
  { title: 'Moleskine' },
];

  return (
    <div>
      <SwiperLayout
        className={'w-full'}
        enableAutoplay={true}
        content={data.map((r: any, index: any) => {
          return (
            <div className="w-32 h-32 !rounded-[50%] bg-white flex items-center justify-center">
              <Image
                src={`/images/brands/${r.title}.png`}
                alt={r.title}
                height={100}
                width={100}
              />
            </div>
          );
        })}
      />
    </div>
  );
};
