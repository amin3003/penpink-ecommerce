'client server'
import { Product } from '@codespase/core';
import { ProductCard } from './ProductCard/ProductCard';

interface ProductListProps {
  //   search: any;
}

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default async function ProductList(props: ProductListProps) {
  const data = await Product.get_list({ __limit: 25 });

  return (
		<div className="w-full grid place-content-center place-items-center xl:grid-cols-4 xl:gap-4 lg:grid-cols-3 lg:gap-6 md:grid-cols-3 grid-cols-1 gap-4 mx-auto mt-3">
			{data.map((r: any, index: any) => {
				return <ProductCard className={'bg-black'} key={index} product={r} />;
			})}
		</div>
	);
}
