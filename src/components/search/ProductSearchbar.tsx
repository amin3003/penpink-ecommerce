import { SearchBox } from '../SearchBox/SearchBox';
import React from 'react';
import { SortBox } from './SortBox';
import clsx from 'clsx';
import AdvancedForm from '../shared/forminput/AdvancedForm';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { FilterButton } from './FilterButton';
import ProductFilterList from './ProductFilterList';
import { ProductMobileSearchbar } from './ProductMobileSearchbar';

export default function ProductSearchbar() {
	return (
		<nav
			className={clsx(
				'container mx-auto',
				'bg-white rounded-lg shadow-md',
				'justify-between items-center flex flex-row',
				'overflow-hidden py-2 px-1 md:px-4 '
			)}
		>
			<SortBox className={clsx('hidden md:flex')} />
			<SearchBox />

			<ProductMobileSearchbar />

			<ModalLayout
				dialog={'filter-dialog'}
				dialogClassName="modal-bottom"
				className={'py-0'}
			>
				<div className="sticky top-0 z-10 bg-base-100 p-2 mb-4">
					<div className="flex justify-center items-center my-3">
						<span className="border-b-2 w-[25%]" />
					</div>
					<ProductFilterList id="mobile-ProductFilterList" />
				</div>
			</ModalLayout>
			<ModalLayout
				dialog={'sort-dialog'}
				dialogClassName="modal-bottom"
				className={'py-0'}
			>
				<div className="sticky top-0 z-10 bg-base-100 p-2 mb-4">
					<div className="flex justify-center items-center my-3">
						<span className="border-b-2 w-[25%]" />
					</div>
				</div>
				<SortBox className="flex-col" />
			</ModalLayout>
		</nav>
	);
}
