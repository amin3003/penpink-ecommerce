import clsx from 'clsx';
import React from 'react';
import { Modify } from '@azrico/types';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
export const Selector = (
  props: Modify<
    Partial<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    >,
    {
      wrapperClassName?: string;
      label?: string;
      labelUrl?: Url;
      inputClass?: string;
      optionData?:any
    }
  >
) => {
  const { wrapperClassName, ...restprops } = props;
  return (
    <>
      <select
        className={clsx(`select w-full select-bordered`, wrapperClassName)}
      >
        <option disabled selected>
          {props.label}
        </option>
        {props.optionData.map((item: any, index: any) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </>
  );
};
