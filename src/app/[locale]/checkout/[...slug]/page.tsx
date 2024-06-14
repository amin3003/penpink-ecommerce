import CheckoutAdress from '@/components/CheckoutAddress/CheckoutAddress';
import { Confirm } from '@/components/Confirm/Confirm';
import { CheckoutPayment } from '@/components/CheckoutPayment/CheckoutPayment';
import { PaymentBtn } from '@/components/PaymentCart/PaymentBtn';
import { PaymentCart } from '@/components/PaymentCart/PaymentCart';
import { Steps } from '@/components/Steps/Steps';
import { redirect } from 'next/navigation';

import TextField from '@/components/TextField/TextField';
import { getServerPathname } from '@/navigation';
import clsx from 'clsx';
const renderComponent = (lastPath: string) => {
  switch (lastPath) {
    case 'ShippingAddress':
      return <CheckoutAdress />;
    case 'confirm':
      return <Confirm />;
    case 'PaymentCheck':
      return <CheckoutPayment />;
    default:
      return redirect(`/cart`);
  }
};
const getPaymentUrl = (lastPath: string): string => {
  switch (lastPath) {
    case 'ShippingAddress':
      return '/cart';
    case 'confirm':
      return '/checkout/ShippingAddress';
    case 'Payment':
      return '/checkout/confirm';
    default:
      return '/cart';
  }
};

export default function page() {
  const serverPathname = getServerPathname();
  const lastPath = String(serverPathname.split('/').pop());
  const paymentUrl = getPaymentUrl(lastPath); // Compute the URL here
  console.log(lastPath);
  return (
    <>
      <Steps serverPathname={lastPath} />

      <div className="flex flex-col lg:flex-row gap-3 lg:h-min-[70vh] !rounded-[20%] mb-5 p-4">
        <div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
          {renderComponent(lastPath)}
        </div>
        <PaymentCart>
          <PaymentBtn
            url={paymentUrl}
            className={'btn-success'}
            text="تکمیل فرایند خرید"
            disabled={false}
          />
        </PaymentCart>
      </div>
    </>
  );
}
