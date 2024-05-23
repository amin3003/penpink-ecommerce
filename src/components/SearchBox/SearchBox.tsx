import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const SearchBox = () => {
	const sp = useSearchParams();

	return (
		<div>
			{/* <button className="btn btn-ghost btn-square flex lg:hidden">
				<i className="bi bi-search"></i>
			</button> */}
			<label className={clsx(`flex items-center self-center`)}>
				<input
					className={clsx(`input input-bordered input-sm max-w-[250px]`)}
					type="text"
					name="search"
					placeholder="جست و جو"
					defaultValue={sp.get('search') ?? ''}
				/>
			</label>
		</div>
	);
};
