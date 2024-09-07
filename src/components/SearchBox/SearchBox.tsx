'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import AdvancedForm from '../shared/forminput/AdvancedForm';

export const SearchBox = () => {
	const sp = useSearchParams();
	return (
		<AdvancedForm
			className={clsx('flex flex-1')}
			id="ProductSearchbar-searchform"
			method="GET"
			action={'products'}
			has={['search']}
		>
			<label className={clsx(`flex flex-1 items-center self-center`)}>
				<i className="bi bi-search text-inherit px-2"></i>
				<input
					className={clsx(
						`input input-ghost input-sm bg-transparent`,
						'flex-1 w-full max-w-[250px]'
					)}
					type="text"
					name="search"
					placeholder="جست و جو"
					defaultValue={sp.get('search') ?? ''}
				/>
			</label>
		</AdvancedForm>
	);
};
