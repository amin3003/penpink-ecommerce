import clsx from 'clsx';
import React from 'react';
import { Modify } from '@azrico/types';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import TextFieldErrorController from './TextFieldErrorController';

export function TextField(
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
			error?: string;
			errors?: { [key: string]: string };
			labelUrl?: Url;
			inputClass?: string;
		}
	>
) {
	let { wrapperClassName, inputClass, errors, error, name, ...restprops } = props;
	if (typeof errors === 'object' && errors && !error) error = errors[String(name)];

	const hasError = Boolean(error);
	return (
    <div className={clsx('relative', wrapperClassName)} data-inputname={name}>
      {hasError && <TextFieldErrorController name={String(props.name)} />}
      <input
        name={name}
        {...restprops}
        // used for showing error
        aria-errormessage={error}
        type={props.type}
        className={clsx(
          'peer input input-sm h-[45px] input-bordered',
          'block rounded-t-lg w-full appearance-none ',
          'focus:outline-none focus:ring-0',
          'aria-[errormessage]:border-error',
          inputClass
        )}
        placeholder=""
      />

      <label
        tabIndex={-1}
        className={clsx(
          'px-1 text-xs text-error peer-aria-[errormessage]:flex hidden'
        )}
      >
        {error}
      </label>

      <div className="label" tabIndex={-1}>
        <Link href={`#${props.labelUrl}`} tabIndex={-1}>
          <span className="label-text-alt" tabIndex={-1}>
            {props.label}
          </span>
        </Link>
      </div>

      <label
        tabIndex={-1}
        className={clsx(
          'bg-base-100 px-1',
          'top-0 -translate-y-1/2',
          'select-none pointer-events-none',
          'absolute text-xs duration-300 transform z-10 origin-[0] start-2.5',
          'peer-focus:text-primary peer-aria-[errormessage]:text-error'
        )}
      >
        {props.placeholder}
      </label>
    </div>
  );
} 
export default TextField;
