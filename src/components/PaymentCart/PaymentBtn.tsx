import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const PaymentBtn = (props: { url: any; disabled: boolean ,text : string}) => {
  return (
    <button
      className={clsx(
        `btn btn-success w-full text-white mt-3`,
        props.disabled ? 'btn-disabled' : null
      )}
    >
      <Link href={props.url}> 
      {props.text}
       </Link>
    </button>
  );
};
