'use client';

import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './customStyle.css';
import { wrap_array } from '@azrico/object';
import clsx from 'clsx';
import React from 'react';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
SwiperCore.use([Navigation]);
export default function BannerLayout(props: {
  content: any;
  className?: string;
}) {
  const contentArray = wrap_array(props.content);

  return (
    <div className={clsx('max-w-full mx-auto', props.className)}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          // Disable navigation below 768px
          767: {
            navigation: false,
          },
          // Enable navigation from 768px and above
          768: {
            navigation: true,
          },
        }}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {contentArray.map((r: any, i: any) => {
          return <SwiperSlide key={i}>{r}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
