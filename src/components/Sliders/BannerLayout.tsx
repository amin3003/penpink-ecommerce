'use client';

// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { wrap_array } from '@azrico/object';
import clsx from 'clsx';
import React from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
SwiperCore.use([Navigation]);
export default function BannerLayout(props: {
  content: any;
  className?: string;
}) {
  const contentArray = wrap_array(props.content);

  return (
    <div className={clsx('max-w-full mx-auto', props.className)}>
      <Swiper
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        loop={true}
  
      >
        {contentArray.map((r: any, i: any) => {
          return <SwiperSlide key={i}>{r}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}

// import React from 'react';
// import SwiperCore, { Navigation } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

// SwiperCore.use([Navigation]);

// const sliderData = [
//   // Your slide data objects here
// ];

// const MySwiper = () => {
//   return (
//     <Swiper
//       spaceBetween={50}
//       slidesPerView={1}
//       navigation={true}
//       modules={[Navigation]}
//       loop={true}
//       loopAdditionalSlide={5} // Adjust this based on your slide count
//     >
//       {sliderData.map((slide, index) => (
//         <SwiperSlide key={index}>{/* Your slide content here */}</SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default MySwiper;
