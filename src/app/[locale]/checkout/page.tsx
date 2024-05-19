import CheckoutAdress from '@/components/CheckoutAddress/CheckoutAddress';
import { PaymentCart } from '@/components/PaymentCart/PaymentCart';
import { Steps } from '@/components/Steps/Steps';
import TextField from '@/components/TextField/TextField';
import clsx from 'clsx';

export default function Page() {
  return (
    <>
      <Steps />

      <div className="flex flex-col lg:flex-row gap-3 lg:h-min-[70vh] !rounded-[20%] mb-5 p-4">
        <div className="flex flex-col gap-3 w-full lg:w-[70%] bg-base-100 !rounded-[2%] py-5 px-5 !divide-y-8">
          <CheckoutAdress />
        </div>
        <PaymentCart />
      </div>
    </>
  );
}
