import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { Product } from '@codespase/core';
// import { BasketHelper } from '@codespase/core';
export default async function Page() {
  // const items = await BasketHelper.getBasketCodeList();
  // const data = [
  //   {
  //     // slug: '',
  //     first_variation: {'60','10'},
  //     name: 'product example',
  //     short_desc: 'Excepteur eiusmod proident consequat sunt cupidatat ea exercitation aliqua laboris culpa aute aute.',
  //   }
  // ];
  const data = await Product.get_list({ __limit: 25 });
  const condition = true;
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:h-min-[80vh] !rounded-[20%] mb-5 p-4">
        <div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
          <ProductCard
            className={
              'w-full flex-col md:!flex-row !min-h-0 px-2 !shadow-none'
            }
            product={data[0]}
            cart={true}
            countUpp={true}
            mobile={true}
          />
          <ProductCard
            className={'w-full !flex-row !min-h-0 px-2 !shadow-none'}
            product={data[1]}
            countUpp={true}
          />
          <ProductCard
            className={'w-full !flex-row !min-h-0 px-2 !shadow-none'}
            product={data[2]}
            countUpp={true}
          />
          <ProductCard
            className={'w-full !flex-row !min-h-0 px-2 !shadow-none'}
            product={data[3]}
            countUpp={true}
          />
          <ProductCard
            className={'w-full !flex-row !min-h-0 px-2 !shadow-none'}
            product={data[4]}
            countUpp={true}
          />
        </div>
        <div className="flex flex-col w-full lg:w-[30%] lg:h-[70vh] ">
          {/* <span>سبد کالا</span> */}
          <div className="flex flex-col justify-around items-start bg-base-100 !rounded-xl p-10 md:h-[50vh] gap-3 ">
            <span className="flex flex-col gap-4 w-full">
              <div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
                <p className=" font-thin">جمع مبلغ کالاها:</p>
                <p className=" font-thin">24,000 تومان</p>
              </div>
              <div className="flex justify-between w-full !my-2 text-[12px] md:text-[14px]">
                <p className="font-thin">سود شما از این خرید:</p>
                <p className=" font-thin">1,000 تومان</p>
              </div>
            </span>
            <div className="divider !divide-dashed"></div>
            <div className="flex flex-col text-justify w-full gap-2 !my-2 text-sm">
              {condition && (
                <p className="text-[10px] font-thin">
                  هزینه ارسال در ادامه بر اساس آدرس و نحوه‌ی ارسال محاسبه و
                  اضافه خواهد شد
                </p>
              )}
              <div className="flex justify-between w-full gap-2 my-2 text-sm font-bold text-[12px] md:text-[14px]">
                <p className="!text-center">جمع سبد خرید:</p>
                <p className="text-justify">25,000 تومان</p>
              </div>
            </div>
          </div>
          <div className="">
            <button className="btn btn-success w-full text-white mt-3">
              تکمیل فرایند خرید{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
