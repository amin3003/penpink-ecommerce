import Link from '@/navigation';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React from 'react';
const sort_types = [
	{ name: 'گران ترین', url: 'most_expensive' },
	{ name: 'ارزان ترین', url: 'cheapest' },
	{ name: 'جدید ترین', url: '_created_date:-1' },
	{ name: 'پرفروش ترین', url: '_created_date:1' },
];

export function SortBox(props: any) {
	const sp = useSearchParams();
	const boxref = React.useRef<any>();
	const selectedSortingMethod = sp.get('sort');

	function onChangedSubmitForm() {
		const foundForm = boxref.current!.closest('form')!;
		console.log(foundForm);
		foundForm.requestSubmit();
	}
	return (
		<div
			ref={boxref}
			className={clsx(
				'flex flex-col lg:flex-row gap-2 py-5 px-2 md:p-3 text-xs   align-middle',
				props.className
			)}
		>
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
		</div>
	);
}
