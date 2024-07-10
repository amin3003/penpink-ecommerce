import ProductSearchSidebar from '@/components/search/Sidebar/ProductSearchSidebar';
import ProductSearchbar from '@/components/search/ProductSearchbar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ProductList from '@/components/product/ProductList/ProductList';
import { Pagination } from '@/components/Pagination/Pagination';
export default async function Page() {
	return (
		<div
			dir="rtl"
			className="flex lg:flex-row flex-col items-center lg:items-start lg:gap-5"
		>
			<div className="flex-2 flex-col p-3 hidden lg:flex sticky top-0 z-10">
				<Breadcrumbs />
				<ProductSearchSidebar />
			</div>

			<div className="flex flex-1 flex-col lg:p-3 max-w-full overflow-hidden">
				<ProductSearchbar />
				<ProductList />
				<Pagination />
			</div>
		</div>
	);
}
