import { gbasket } from '@azrico/global';
import React from 'react';
import Link from '@/navigation';

export default async function Basket(props: any) {
	// const items = await getBasketCodeList();
	return (
    <>
      <Link href={'/cart'}>
        <div className="indicator btn btn-ghost btn-sm">
          <i className="bi bi-cart-fill text-lg"></i>
          <span className="badge badge-base badge-sm indicator-item indicator-start">
            {/* {items.length ?? 0} */}0
          </span>
        </div>
      </Link>
    </>
  );
}
