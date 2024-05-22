import { FilterBox } from '@/components/search/FilterBox';
import Searchbar from '@/components/search/Searchbar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ProductList from '@/components/product/ProductList';
import { Pagination } from '@/components/Pagination/Pagination';
import { Filterbar } from '@/components/search/Filterbar';
export default async function Page() {
	return (
		<div
			dir="rtl"
			className="flex lg:flex-row flex-col items-center lg:items-start lg:gap-5"
		>
			<h4>پیگیری سفارش</h4>
			<p>لطفا ایمیل/شماره تلفن و شماره سفارش خود را وارد کنید</p>
		</div>
	);
}
