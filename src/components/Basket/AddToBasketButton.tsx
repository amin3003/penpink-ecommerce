import React from 'react';
import { Product, ProductVariation, BasketItem } from '@codespase/core';
import Image from 'next/image';
import AzFetch, { AzNextHelper } from '@azrico/fetch';
import { FaPlusCircle } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';
import { CountUpp } from './CountUpp';
import { BasketBtn } from './BasketBtn';
export default async function AddToBasketButton(props: {
  product: Product;
  variation?: ProductVariation;
  small?: boolean;
  showprice?: boolean;
  cart?: boolean;
  countUpp?: boolean;
}) {
  const { product } = props;
  const use_variation = props.variation ?? product.variations[0];

  /**
   * add to basket of current user
   * based on current user `uid` (uid is set on `authMiddleware`)
   * @returns
   */
  async function addToBasket() {
    'use server';
    return await AzFetch.post(`@/api/basket`, {
      product_id: product._id,
      variation_code: use_variation.variation_code,
      add: 1,
    });
  }

  if (!use_variation) return <>product not found</>;

  const btnElement = props.small ? (
    <span className="flex">
      <button className="btn btn-circle btn-ghost">
        <i className="bi bi-bag-plus" />
      </button>
    </span>
  ) : (
    <span className='flex'>
      <button className="btn btn-md text-xs md:text-md btn-primary flex items-center w-full">
        افزودن به سبد خرید
      </button>
    </span>
  );

  if (!props.showprice)
    return <span className="flex flex-col">{btnElement}</span>;
  return (
    <form className="flex flex-row gap-7 md:gap:3 flex-1" dir="rtl" action={addToBasket}>
      {/* <AddToBasketController variation_code={vcode} /> */}
      <span className="felx flex-col flex-1">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col justify-end items-end">
            <span>
              <p>{use_variation.useprice}</p>
            </span>
            <span>
              {use_variation.discount_percent > 0 && (
                <p className="line-through text-xs">{use_variation.price}</p>
              )}
            </span>
          </div>
          <Image
            className="size-[30px]"
            src={`/images/toman.svg`}
            alt=""
            width={30}
            height={30}
            quality={100}
          />
        </div>
      </span>
      {props.countUpp ? <CountUpp /> : btnElement}
    </form>
  );
}
