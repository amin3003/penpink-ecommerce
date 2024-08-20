import React from 'react';
import { Container } from './Container';
import OrdersBar from './OrdersBar';

export const Orders = (props: any) => {
  return (
    <Container className={'!p-4'}>
      {!props.useCategories && (
        <div className="flex justify-start items-center text-sm p-4">
          <b className="text-sm md:text-md text-center">سفارش های من</b>
        </div>
      )}
      {!props.useCategories &&
      <hr />}
      <OrdersBar useCategories={props.useCategories} />
    </Container>
  );
};
