'use client';

// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import { wrap_array } from '@azrico/object';
import clsx from 'clsx';
import React, { useRef } from 'react';

export default function SwiperLayout(props: {
  content: any[];
  className?: string;
  center?: boolean;
  enableAutoplay?: boolean;
  swiperOptions?: SwiperProps;
}) {
  const propSwiperOptions = props.swiperOptions || {};
  const contentArray = wrap_array(props.content);
  const autoplayOptions = props.enableAutoplay
    ? {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        speed: 1000,
      }
    : {};

  const swiperOptions: SwiperProps = {
    grabCursor: false,
    loop: true,
    slideToClickedSlide: true,
    centeredSlides: props.center,
    slidesPerView: 1,
    breakpoints: {
      425: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
    pagination: false,
    modules: [Pagination, Autoplay],
    style: { flex: 1, paddingTop: 4, display: 'flex' },
    initialSlide: Math.floor(contentArray.length / 2),
    ...autoplayOptions,
    ...propSwiperOptions,
  };

  const swiperRef = useRef<any>(null);

  return (
    <div className={clsx('max-w-full mx-auto', props.className)}>
      <Swiper
        {...(swiperOptions as any)}
        className="!overflow-hidden"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {contentArray.map((r: any, i: any) => {
          return (
            <SwiperSlide
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
                borderRadius: '18px',
                padding: '0.5em',
                height: 'auto',
              }}
              onMouseEnter={() => {
                if (props.enableAutoplay && swiperRef.current?.autoplay) {
                  swiperRef.current.autoplay.stop();
                }
              }}
              onMouseLeave={() => {
                if (props.enableAutoplay && swiperRef.current?.autoplay) {
                  swiperRef.current.autoplay.start();
                }
              }}
            >
              {r}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
