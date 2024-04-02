import Image from 'next/image';
import React from 'react';

interface CategoryProps {
  className?: string;
  title?: string;
}

const data = [
  { title: 'لوازم هنری', url: 'edari' },
  { title: 'لوازم هنری', url: 'honari' },
  { title: 'لوازم هنری', url: 'memari' },
  { title: 'لوازم هنری', url: 'tahrir' },
];

export const Category = (props: CategoryProps) => {
  return (
    <>
      <div className="outer-wrapper flex justify-center my-10">
        {' '}
        {/* New outer wrapper */}
        <div className="main grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-32 h-40 md:w-56 md:h-56 flex justify-center items-center bg-white shadow-md rounded-lg" // Add styling for box
              >
                <b className="absolute text-xl">{item.title}</b>
                <div className="w-40 h-40">
                  <Image
                    className="w-full object-contain" // Adjust for aspect ratio
                    src={`/images/category/${item.url}.svg`}
                    width={200}
                    height={200}
                    alt={`${item.url}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
