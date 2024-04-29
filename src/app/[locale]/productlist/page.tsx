import { FilterBox } from '@/components/search/FilterBox';
import Searchbar from '@/components/search/Searchbar';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { Product } from '@codespase/core';
import ProductSlider from '@/components/product/ProductSlider/ProductSlider';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import ProductList from '@/components/product/ProductList';
import { Pagination } from '@/components/Pagination/Pagination';
import { Filterbar } from '@/components/search/Filterbar';
export default async function Page() {
  return (
    <div
      dir="rtl"
      className="flex lg:flex-row flex-col items-center lg:items-start lg:gap-5"
    >
      <div className="flex-2 flex-col p-3 hidden lg:flex sticky top-0 z-10 ">
        <Breadcrumbs className={''} />
        <FilterBox className={''} accordionClass={''} />
      </div>
      <div className="lg:hidden flex flex-1 flex-col w-full px-9">
        <Filterbar />
      </div>
      <div className="flex flex-1 flex-col lg:p-3">
        <Searchbar />
        <ProductList />
        <Pagination />
      </div>
    </div>
  );
}
