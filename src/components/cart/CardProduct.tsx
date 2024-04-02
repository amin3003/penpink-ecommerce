import Image from 'next/image';
import React from 'react';

export const CardProduct = (props: any) => {
  const { off, name, desc, Price, firstPrice } = props;

  return (
    <div
      className="card w-56 h-96 glass flex flex-col items-center justify-around overflow-hidden"
      dir="rtl"
    >
      <figure className="w-full h-[220px] rounded-md">
        <span className="absolute right-3 top-3">
          {off && (
            <div className="badge badge-primary ">
              {Math.floor(
                (100 * (Number(firstPrice) - Number(Price))) /
                  Number(firstPrice)
              )}
              {'%'}
            </div>
          )}
        </span>
        <Image
          className="w-full"
          src={`/images/product/${name}.jpeg`}
          alt="Product Image"
          width={500}
          height={256}
          quality={100}
          layout="responsive"
        />
      </figure>
      <div className="card-body pt-5">
        <p className="mb-4 text-justify text-md leading-5">{desc}</p>
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
