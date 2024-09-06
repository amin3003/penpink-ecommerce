'use client';
import Link from 'next/link';
import { SearchBox } from '../SearchBox/SearchBox';
import React from 'react';
import { SortBox } from './SortBox';
import clsx from 'clsx';
import AdvancedForm from '../shared/forminput/AdvancedForm';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import ScreenSizeComponentController from '../layout/ScreenSizeComponentController';
import { FilterButton } from './FilterButton';

export default function ProductSearchbar() {
	return (
		<AdvancedForm
			id="ProductSearchbar-searchform"
			method="GET"
			action={'products'}
			className={clsx(
				'container mx-auto',
				'bg-white rounded-lg shadow-md',
				'justify-between items-center flex flex-row',
				'overflow-hidden py-2 px-4 '
			)}
			exclude={['search', '__sort', 'sort']}
		>
			<SortBox className={clsx('hidden md:flex')} />
			<SearchBox />
			<MobileSearchbar />
		</AdvancedForm>
	);
}

export const MobileSearchbar = (props: any) => {
	return (
		<>
			<ScreenSizeComponentController
				element="MobileSearchbar"
				above={false}
				breakpoint="md"
			/>
			<nav id="MobileSearchbar">
				<div className="flex justify-center items-center bg-white rounded-lg h-10 w-full">
					<button
						type="button"
						className="flex flex-1 !justify-center !items-center"
						onClick={() => (document.getElementById('filter') as any).showModal()}
					>
						<div className="flex gap-2 justify-center items-center text-xs">
							{/* <IoFilter /> */}
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
							{/* <FaSortAmountDown /> */}
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
			</nav>
		</>
	);
};
