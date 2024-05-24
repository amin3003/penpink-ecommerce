'client server'
import { Category, Product } from '@codespase/core';
import { ProductCard } from './ProductCard/ProductCard';
import { getServerSearchParams } from '@/navigation';
import { DBManager } from '@azrico/nodeserver';

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default async function ProductList(props: any) {
	const sp = getServerSearchParams();
	const sq: any = { __limit: 25 };
	if (sp.get('search')) {
		sq['name'] = new RegExp(String(sp.get('search')));
	}
	if (sp.get('category')) {
		const all_cats = await Category.get_categoryWithSubs(sp.get('category'));
		sq['categories'] = { $in: all_cats.map((r) => r.getID()) };
	}
	if (sp.get('sort')) {
		const spSort = String(sp.get('sort')).split(':');
		switch (spSort[0]) {
			case 'cheapest':
				sq['__sort'] = { ['variations.0.price']: 1 };
				break;
			case 'most_expensive':
				sq['__sort'] = { ['variations.0.price']: -1 };
				break;
			default:
				sq['__sort'] = { [spSort.shift() ?? 'sort']: Number(spSort.shift() ?? 1) };
				break;
		}
	}
	console.log('sq:', sq);
	DBManager.extra_logs = true;
	const data = await Product.get_list(sq);

	return (
		<div className="w-full grid place-content-center place-items-center xl:grid-cols-4 xl:gap-4 lg:grid-cols-3 lg:gap-6 md:grid-cols-3 grid-cols-1 gap-4 mx-auto mt-3">
			{data.map((r: any, index: any) => {
				return <ProductCard className={'bg-black'} key={index} product={r} />;
			})}
		</div>
	);
}
