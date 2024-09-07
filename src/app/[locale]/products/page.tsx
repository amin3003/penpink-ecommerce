import ProductSearchbar from '@/components/search/ProductSearchbar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ProductList from '@/components/product/ProductList/ProductList';
import { Pagination } from '@/components/Pagination/Pagination';
import clsx from 'clsx';
import ProductFilterList from '@/components/search/ProductFilterList';
export default async function Page() {
	/**
	 * Product Search Bar is not here
	 * its in the Page Header Component
	 */
	return (
		<>
			<div
				dir="rtl"
				className={clsx(
					'flex lg:flex-row flex-col items-center lg:items-start lg:gap-5 lg:pt-10'
				)}
			>
				{/* desktop sidebar */}
				<div className="flex-2 flex-col p-3 gap-3 hidden lg:flex sticky top-16 z-10">
					<Breadcrumbs />
					<ProductFilterList id="sidebar-ProductFilterList" />
				</div>

				<div
					className={clsx(
						'min-h-lvh flex flex-1 flex-col',
						'lg:p-3 size-full overflow-hidden'
					)}
				>
					{/* product list */}
					<ProductSearchbar />
					<ProductList />
					<Pagination />
				</div>
			</div>
		</>
	);
}
