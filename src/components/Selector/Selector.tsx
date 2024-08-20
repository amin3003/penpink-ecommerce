import clsx from 'clsx';
import React from 'react';
import { Modify } from '@azrico/types';
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
      optionData?: any;
    }
  >
) => {
  const { wrapperClassName, ...restprops } = props;
  return (
    <>
      
        <select
          name={props.name}
          className={clsx(
            `select w-full select-bordered !text-xs text-right select-sm`, // Attempting to align text right
            wrapperClassName
          )}
          defaultValue={props.label}
        >
          <option className="text-right" disabled>
            {props.label}
          </option>
          {props.optionData.map((item: any, index: any) => {
            return (
              <option key={index} className="text-right">
                {item}
              </option>
            );
          })}
        </select>
    
    </>
  );
};
