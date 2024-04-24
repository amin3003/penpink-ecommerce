import { FilterBox } from '@/components/search/FilterBox';
import Searchbar from '@/components/search/Searchbar';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import { Product } from '@codespase/core';
import ProductSlider from '@/components/product/ProductSlider/ProductSlider';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import ProductList from '@/components/product/ProductList';
import { Pagination } from '@/components/Pagination/Pagination';
export default async function Page() {
  return (
    <div dir="rtl" className="flex mx-auto lg:gap-5">
      <div className="flex-2 flex-col p-3 hidden lg:flex">
        <Breadcrumbs />
        <FilterBox />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <Searchbar />
        <ProductList />
        <Pagination/>
      </div>
    </div>
  );
}
