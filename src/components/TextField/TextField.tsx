import clsx from 'clsx';
import React from 'react';
import { Modify } from '@azrico/types';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

export function TextField(
  props: Modify<
    Partial<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    >,
    { wrapperClassName?: string; label?: string; labelUrl?: Url; inputClass?:string }
  >
) {
  const { wrapperClassName, inputClass, ...restprops } = props;
	return (
		<div className={clsx('relative', wrapperClassName)}>
			<input
				{...restprops}
				// value={props.value || ''}
				type={props.type}
				className={clsx(
					'peer input input-md input-bordered',
					'block rounded-t-lg w-full appearance-none ',
					'focus:outline-none focus:ring-0',
					inputClass
				)}
				placeholder=""
			/>
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
					'absolute text-sm duration-300 transform z-10 origin-[0] start-2.5',
					'peer-focus:text-primary'
				)}
			>
				{props.placeholder}
			</label>
		</div>
	);
}
export default TextField;
