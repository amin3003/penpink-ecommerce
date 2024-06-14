('');
import Image from 'next/image';
import React from 'react';

export const Shape = () => {
  // const data = [
  //   {}
  // ]
  return (
    <>
      {/* <Image
        src="/images/blob.svg"
        className="absolute inset-0 -z-50 top-56"
        alt="Picture of the author"
        width={1000000000}
        height={1000000000}
        quality={100}
      /> */}

      <div
        style={{ zIndex: -500000 }}
        className="absolute inset-0 overflow-hidden w-full h-full grid grid-rows-2"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200%] h-[100%] mr-[-300px] md:mr-[-800px] lg:mr-[-1000px] xl:mr-[-1500px] mt-[300px]"
        >
          <path
            fill="#FFD6E8"
            d="M58.1,-14.8C65.9,4.9,56.1,34.4,36.5,48.1C16.9,61.9,-12.6,59.9,-34.5,44.7C-56.4,29.4,-70.7,0.9,-63.7,-17.8C-56.7,-36.6,-28.4,-45.5,-1.6,-45C25.2,-44.5,50.4,-34.5,58.1,-14.8Z"
            transform="translate(100 100)"
          />
        </svg>

        <span className="grid grid-col-2">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[200%] h-[100%] ml-[-100px] md:ml-[-500px] mt-[-100px]"
          >
            <path
              fill="#FFD6E8"
              d="M58.1,-14.8C65.9,4.9,56.1,34.4,36.5,48.1C16.9,61.9,-12.6,59.9,-34.5,44.7C-56.4,29.4,-70.7,0.9,-63.7,-17.8C-56.7,-36.6,-28.4,-45.5,-1.6,-45C25.2,-44.5,50.4,-34.5,58.1,-14.8Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[100%] h-[100%]  mr-[-150px] md:mr-[-330px] lg:mr-[-450px] xl:mr-[-800px] mt-[-200px]"
          >
            <path
              fill="#FFD6E8"
              d="M58.1,-14.8C65.9,4.9,56.1,34.4,36.5,48.1C16.9,61.9,-12.6,59.9,-34.5,44.7C-56.4,29.4,-70.7,0.9,-63.7,-17.8C-56.7,-36.6,-28.4,-45.5,-1.6,-45C25.2,-44.5,50.4,-34.5,58.1,-14.8Z"
              transform="translate(100 100)"
            />
          </svg>
        </span>
      </div>
    </>
  );
};
