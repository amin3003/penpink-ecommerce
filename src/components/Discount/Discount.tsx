import clsx from 'clsx';
import React from 'react';
import AddToBasket from '@/components/Basket/AddToBasket';
import DBImage from '@/components/Image/DBImage';
import { Product } from '@codespase/core';
import Link from '@/navigation';
import { array_first } from '@azrico/object';
import SwiperLayout from '../Sliders/SwiperLayout';
import Image from 'next/image';

/**
 * A single product card, mostly used in sliders.
 * @param props
 * @returns
 */
export default async function Discount(props: {
  search: any;
  className?: string;
  cart?: boolean;
  hideBasket?: boolean;
  cartValue?: number;
}) {
  const products = await Product.get_list(props.search);

  if (!products || products.length === 0) {
    return <></>; // RetUrn empty fragment if no products found
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <b className="md:text-2xl text-md">تخفیف ویژه </b>
      <span className="w-full  ">
        <Image
          className="absolute -z-5 top-[126rem] right-[-1rem]"
          src="/images/party1.svg"
          alt="Picture of the author"
          width={300}
          height={300}
          quality={100}
        />
        <div className="bg-primary w-full rounded-xl flex flex-row gap-10 items-center justify-around p-6">
          <SwiperLayout
            className={'w-full'}
            enableAutoplay={true}
            content={products.map((product, index) => {
              const first_variation = product.variations[0];
              if (!first_variation) return null;

              const product_link = `/product/${product.slug ?? product.getID()}`;

              return (
                <div
                  key={index}
                  className="card w-48 min-h-[21rem] h-max flex flex-col items-center justify-around overflow-hidden py-4 px-0 bg-secondary !rounded-t-xl !rounded-b-none"
                >
                  <figure>
                    <span className={clsx('absolute right-1 top-1')}>
                      {first_variation.discount_percent > 0 && (
                        <div className="badge w-10 text-[13px] text-center badge-primary">
                          {first_variation.discount_percent}%
                        </div>
                      )}
                    </span>
                    <DBImage
                      link={product_link}
                      className="size-40 rounded-xl"
                      src={String(array_first(first_variation.images) ?? '')}
                      width={512}
                      height={512}
                    />
                  </figure>
                  <Link href={product_link} className="p-1">
                    <p
                      className={clsx(
                        'text-xs leading-5 max-h-10 text-start opacity-85',
                        'my-2 text-ellipsis break-words overflow-hidden block'
                      )}
                      dir="auto"
                    >
                      {product.short_desc}
                    </p>
                  </Link>
                  {props.hideBasket !== true && (
                    <div className="card-actions w-full justify-between items-center px-4">
                      <AddToBasket
                        product={product}
                        showprice
                        small
                        cart={props.cart}
                        cartValue={props.cartValue}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          />
        </div>
        <Image
          className="absolute -z-5 left-0 top-[145rem]"
          src="/images/party2.svg"
          alt="Picture of the author"
          width={300}
          height={300}
          quality={100}
        />
      </span>
    </div>
  );
}
