'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import AdvancedForm from '../shared/forminput/AdvancedForm';
const sort_types = [
	{ name: 'گران ترین', url: 'most_expensive' },
	{ name: 'ارزان ترین', url: 'cheapest' },
	{ name: 'جدید ترین', url: 'newest' },
	{ name: 'پرفروش ترین', url: 'sales' },
];

export function SortBox(props: { className?: string }) {
	const sp = useSearchParams();
	const selectedSortingMethod = sp.get('sort');
	const sortBoxId = 'sortbox-' + React.useId();

	function onChangedSubmitForm() {
		const foundForm = document.getElementById(sortBoxId)! as HTMLFormElement;
		foundForm.requestSubmit();
	}
	return (
		<AdvancedForm
			id={sortBoxId}
			className={clsx(
				'flex flex-row lg:flex-row gap-2 py-5 px-2 md:p-3 text-xs align-middle',
				props.className
			)}
			method="GET"
			action={'products'}
			has={['__sort', 'sort']}
		>
			<p className="text-xs self-center font-bold text-nowrap">مرتب سازی</p>

			{sort_types.map((item, index) => {
				return (
					<React.Fragment key={index}>
						<label
							className={clsx(
								'transition-colors cursor-pointer bg-transparent has-[:checked]:bg-neutral rounded-lg',
								'text-center p-2 text-nowrap'
							)}
						>
							<input
								onChange={(e) => e.target.value && onChangedSubmitForm()}
								type="radio"
								name={'sort'}
								value={item.url}
								defaultChecked={selectedSortingMethod === item.url}
								hidden
							/>
							{item.name}
						</label>
					</React.Fragment>
				);
			})}
		</AdvancedForm>
	);
}
