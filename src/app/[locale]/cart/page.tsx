import { PaymentBtn } from '@/components/PaymentCart/PaymentBtn';
import { PaymentCart } from '@/components/PaymentCart/PaymentCart';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { BasketItem, Product } from '@codespase/core';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default async function Page() {
  const data = await BasketItem.get_list();
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:h-min-[70vh] !rounded-[20%] mb-5 p-4">
        <div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
          {data.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full">
              <i className="bi bi-basket2-fill text-[100px] text-gray-500"></i>
            </div>
          ) : (
            data.map((item, index) => {
              if (item.__product == null) return null;
              return (
                <ProductCard
                  key={item.getID()}
                  className={
                    'w-full flex-col md:!flex-row !min-h-0 px-2 !shadow-none'
                  }
                  product={item.__product}
                  cart={true}
                  cartValue={item.quantity}
                />
              );
            })
          )}
        </div>
        <PaymentCart>
          <PaymentBtn
            url={'checkout/ShippingAddress'}
            className={'!btn-success !text-white'}
            text={'تکمیل فرایند خرید'}
            disabled={false}
          />
        </PaymentCart>
      </div>
    </>
  );
}
