import { Category, Product } from '@codespase/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { getServerSearchParams } from '@/navigation';
import { object_get } from '@azrico/object';

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default async function ProductList(props: any) {
	const sq = await getProductSQFromUrl();
	const data = await Product.get_list(sq); 
	return (
		<div className="w-full grid place-content-center place-items-center xl:grid-cols-4 xl:gap-4 lg:grid-cols-3 lg:gap-6 md:grid-cols-3 grid-cols-1 gap-4 mx-auto mt-3">
			{data.map((r, index: any) => {
				return <ProductCard key={r.getID()} product={r} />;
			})}
		</div>
	);
}
export async function getProductSQFromUrl() {
	const sp = getServerSearchParams();
	const sq: any = { __limit: 25 };
	if (sp.get('search')) {
		sq['name'] = String(sp.get('search'));
	}
	if (sp.get('category')) {
		sq['category'] = sp.get('category');
	}

	let sortObj: any = object_get(sp, 'sort');
	switch (sortObj) {
		case 'newest':
			sq['__sort'] = { _created_date: -1 };
			break;
		case 'oldest':
			sq['__sort'] = { _created_date: 1 };
			break;
		case 'cheapest':
			sq['__sort'] = { ['variations.0.price']: 1 };
			break;
		case 'most_expensive':
			sq['__sort'] = { ['variations.0.price']: -1 };
			break;
	}
	return sq;
}