import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const CardProduct = (props: any) => {
  const { off, name, desc, Price, firstPrice ,url} = props;

  return (
    <div
      className="card w-48 h-80 glass flex flex-col items-center justify-around overflow-hidden py-4 px-0 !shadow-md"
      dir="rtl"
    >
      <Link href={url}>
        <figure className="w-48 rounded-md px-4 py-0">
          <span className="absolute right-1 top-1">
            {off && (
              <div className="badge w-10 text-[13px] text-center badge-primary ">
                {Math.floor(
                  (100 * (Number(firstPrice) - Number(Price))) /
                    Number(firstPrice)
                )}
                {'%'}
              </div>
            )}
          </span>
          <Image
            className="w-full rounded-xl"
            src={`/images/product/${name}.jpeg`}
            alt="Product Image"
            width={700}
            height={656}
            quality={100}
            layout="responsive"
          />
        </figure>
      </Link>
      <div className="card-body px-4 py-1 gap-0">
        <p className="text-right h-min text-md leading-5 ">{desc}</p>
        <div className="card-actions w-full justify-between items-center">
          <span className="flex flex-col">
            <button role="submit">
              <i className="bi bi-bag-plus" />
            </button>
          </span>
          <span className="felx flex-col">
            <div className="flex gap-2 justify-center items-center">
              <div className="flex flex-col justify-end items-end">
                <span>
                  <p>{Price}</p>
                </span>
                <span>
                  {off && <p className="line-through text-xs">{firstPrice}</p>}
                </span>
              </div>
              <Image
                className=""
                src={`/images/toman.svg`}
                alt="Currency"
                width={30}
                height={30}
                quality={100}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
