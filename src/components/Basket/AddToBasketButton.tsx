import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import { gstorage, gbasket } from '@azrico/global';
import Image from 'next/image';
// import AddToBasketController from './AddToBasketController';
import AzFetch, { AzNextHelper } from '@azrico/fetch';
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
  const vcode = use_variation.getVariationCode();
  const buttonid = `btn-addbasket-${vcode}`;

  /**
   * add to basket of current user
   * based on current user `uid` (uid is set on `authMiddleware`)
   * @returns
   */
  async function addToBasket() {
    'use server';
    return await AzFetch.post(`@/api/basket`, { code: vcode, add: 1 });
  }

  if (!use_variation) return <>product not found</>;

  const btnElement = props.small ? (
    <button className="btn btn-circle btn-ghost" id={buttonid}>
      <i className="bi bi-bag-plus" />
    </button>
  ) : (
    <button
      className="btn btn-md text-xs md:text-md btn-primary flex items-center w-full"
      id={buttonid}
    >
      افزودن به سبد خرید
    </button>
  );

  if (!props.showprice)
    return <span className="flex flex-col">{btnElement}</span>;
  return (
    <form
      key={vcode}
      className="flex flex-row gap-2 flex-1"
      dir="rtl"
      action={addToBasket}
    >
      {/* <AddToBasketController variation_code={vcode} /> */}
      <div className="felx !flex-row w-full">
        <div className="flex flex-row gap-2 flex-1 items-center justify-end">
          <div className="flex flex-1 items-center ">
            {props.countUpp ? <CountUpp /> : <BasketBtn />}
          </div>
          <div className="flex flex-col justify-end items-center">
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
            className=""
            src={`/images/toman.svg`}
            alt="Currency"
            width={30}
            height={30}
            quality={100}
          />
        </div>
      </div>
    </form>
  );
}
