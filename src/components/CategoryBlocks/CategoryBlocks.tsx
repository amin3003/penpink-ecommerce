import Image from 'next/image';
import Link from 'next/link';
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

export const CategoryBlocks = (props: CategoryProps) => {
  return (
    <>
      <div className="grid py-5 grid-cols-2 gap-3 md:grid-cols-4 md:gap-16 w-full justify-items-center">
        {data.map((item, index) => {
          return (
            <Link href="#">
              <div
                key={index}
                className="relative size-28 md:size-32 flex justify-center items-center bg-white shadow-md rounded-lg" // Add styling for box
              >
                <div className="absolute bg-black opacity-20 inset-0 rounded-lg"></div>
                <b className="absolute text-xl text-white">{item.title}</b>
                <div className="w-40 h-40">
                  <Image
                    className="w-full h-full object-cover" // Adjust for aspect ratio
                    src={`/images/category/${item.url}.png`}
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
