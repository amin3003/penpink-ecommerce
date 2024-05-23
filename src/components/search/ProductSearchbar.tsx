'use client';
import Link from 'next/link';
import { SearchBox } from '../SearchBox/SearchBox';
import { IoFilter } from 'react-icons/io5';
import { FaSortAmountDown } from 'react-icons/fa';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { FilterButton } from './FilterButton';

import React from 'react';
import { SortBox } from './SortBox';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

export default function ProductSearchbar() {
	const sp = useSearchParams();
	return (
		<form
			id="searchform"
			method="GET"
			action={'products'}
			className="bg-white rounded-lg justify-between items-center  flex flex-row px-4"
		>
			{/* hidden inputs so we dont forget some searches when submiting form again */}
			<input hidden type="text" name="category" defaultValue={sp.get('category') ?? ''} />
			{/* show forms */}
			{/* <div className="lg:hidden flex flex-row">
				<MobileSearchbar />
			</div> */}
			<div className="hidden lg:flex flex-row flex-1 items-center">
				<PCSearchbar />
			</div>
		</form>
	);
}
export const PCSearchbar = (props: any) => {
	return (
		<>
			<p className="text-xs self-center font-bold text-nowrap">مرتب سازی</p>
			<SortBox className="flex-1" />
			<SearchBox />
		</>
	);
};
export const MobileSearchbar = (props: any) => {
	return (
		<>
			<div className="flex justify-center items-center bg-white rounded-lg h-10 w-full">
				<button
					type="button"
					className="flex flex-1 !justify-center !items-center"
					onClick={() => (document.getElementById('filter') as any).showModal()}
				>
					<div className="flex gap-2 justify-center items-center text-xs">
						<IoFilter />
						فیلتر
					</div>
				</button>
				<div className="divider divider-horizontal m-0" />
				<button
					type="button"
					className="flex flex-1 justify-center items-center"
					onClick={() => (document.getElementById('sort') as any).showModal()}
				>
					<div className="flex gap-2 justify-center items-center text-xs">
						<FaSortAmountDown />
						مرتب سازی
					</div>
				</button>
			</div>
			<ModalLayout dialog={'filter'} className={'py-0'}>
				<div className="sticky top-0 z-10 bg-base-100 p-2 mb-4">
					<div className="flex justify-center items-center my-3">
						<span className="border-b-2 w-[25%]" />
					</div>
					<div className="flex justify-between items-center pb-3">
						<b className="text-sm">فیلتر نتایج بر اساس : </b>
					</div>
				</div>
				<FilterButton className="sticky bottom-0 z-10 bg-base-100" />
			</ModalLayout>
			<ModalLayout dialog={'sort'} className={'py-0'}>
				<div className="sticky top-0 z-10 bg-base-100 p-2 mb-4">
					<div className="flex justify-center items-center my-3">
						<span className="border-b-2 w-[25%]" />
					</div>
					<div className="flex justify-between items-center pb-3">
						<b className="text-sm">مرتب سازی براساس : </b>
					</div>
				</div>
				<SortBox />
			</ModalLayout>
		</>
	);
};
