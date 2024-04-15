'use client';

// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import { wrap_array } from '@azrico/object';
import clsx from 'clsx';
import React from 'react';

export default function SwiperLayout(props: {
  content: any[];
  className?: string;
  center?: boolean;
  swiperOptions?: SwiperProps;
}) {
  const propSwiperOptions = props.swiperOptions || {};
  const contentArray = wrap_array(props.content);
  const swiperOptions: SwiperProps = {
    grabCursor: false,
    slideToClickedSlide: true,
    centeredSlides: props.center,
    slidesPerView: 1,
    breakpoints: {
      425: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },

    pagination: false,
    modules: [Pagination],
    style: { flex: 1, paddingTop: 4, display: 'flex' },

    initialSlide: Math.floor(contentArray.length / 2),
    ...propSwiperOptions,
  };

  return (
		<div className={clsx('max-w-full mx-auto', props.className)}>
			<Swiper {...(swiperOptions as any)} className="!overflow-hidden">
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
						>
							{r}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
