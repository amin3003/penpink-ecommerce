'use client';
import React, { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { FilterBox } from './FilterBox';
import { Accordion } from '../Accordion/Accordion';
import { SearchBox } from '../SearchBox/SearchBox';
import { GoDash } from 'react-icons/go';
import { GoX } from 'react-icons/go';
import Image from 'next/image';
import { FilterButton } from './FilterButton';
import { SortItem } from './SortItem';

export const Filterbar = () => {
	const [modelId, setModelId] = useState<string>('');
	const sortData = [
		{ name: 'گران ترین', url: 'most_expensive' },
		{ name: 'ارزان ترین', url: 'cheapest' },
		{ name: 'جدید ترین', url: 'category_location' },
		{ name: 'برفروش ترین', url: 'most_purchased' },
	];

	return (
		<>
			<div className="flex lg:hidden justify-center items-center bg-white rounded-lg h-10 w-full">
				<button
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
						{/* <Image
							src="/images/close.svg"
							alt="close"
							width={15}
							height={15}
							quality={100}
						/> */}
					</div>
				</div>
				<SearchBox className={'w-[80%]'} />
				<FilterBox className={'!w-[80%] mx-auto'} accordionClass={''} />
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
				<SortItem data={sortData} />
			</ModalLayout>
		</>
	);
};
