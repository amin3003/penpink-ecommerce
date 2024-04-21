import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryProps {
  className?: string;
  title?: string;
}

const data = [
  { title: 'لوازم اداری', url: 'edari' },
  { title: 'لوازم هنری', url: 'art' },
  { title: 'لوازم معماری', url: 'memari' },
  { title: 'لوازم التحریر', url: 'tahrir' },
];

export const CategoryBlocks = (props: CategoryProps) => {
  return (
    <>
      <div className="grid py-5 md:px-4 lg:px-0 grid-cols-2 gap-3 md:grid-cols-4 md:gap-16 w-full justify-items-center hover:border-pink-700">
        {data.map((item, index) => {
          return (
            <Link href="#">
              <div
                key={index}
                className="relative size-24 md:size-32 flex justify-center items-center bg-white  shadow-md rounded-lg" // Add styling for box
              >
                <div className="absolute bg-black opacity-30 inset-0 rounded-lg"></div>
                <b className="absolute text-lg md:text-xl text-white">
                  {item.title}
                </b>
                <div className="size-20 md:size-24">
                  <Image
                    className="w-full h-full object-contain" // Adjust for aspect ratio
                    src={`/images/category/${item.url}.svg`}
                    width={5000}
                    height={5000}
                    alt={`${item.url}`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
