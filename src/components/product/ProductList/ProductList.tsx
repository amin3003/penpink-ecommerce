import { Category, Product } from '@codespase/core';
import { ProductCard } from '../ProductCard/ProductCard';
import Link, { getServerSearchParams } from '@/navigation';
import { object_clean, object_get, object_isEmpty } from '@azrico/object';
import clsx from 'clsx';

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default async function ProductList(props: any) {
	const sq = await getProductSQFromUrl();
	const data = await Product.get_list(sq);
	let preferedVariation: any = object_clean({
		color: sq['v-color'],
		brand: sq['v-brand'],
	});
	if (object_isEmpty(preferedVariation)) preferedVariation = undefined;

	if (data.length === 0) {
		return <NoProductsFound />;
	}
	return (
		<div
			className={clsx(
				'grid place-content-center place-items-center',
				'w-full xl:grid-cols-4 xl:gap-4 lg:grid-cols-3 lg:gap-6 md:grid-cols-3 grid-cols-1 gap-4 mt-3'
			)}
		>
			{data.map((r, index: any) => {
				return (
					<ProductCard
						className="!h-[23rem]"
						key={r.getID()}
						product={r}
						prefer={preferedVariation}
					/>
				);
			})}
		</div>
	);
}
function NoProductsFound() {
	return (
		<div className="size-full min-h-64 flex flex-col gap-4 justify-center items-center text-center">
			<span> {' هیچ محصولی یافت نشد'}</span>
			<Link className="btn btn-primary" href={'/products'}>
				نمایش همه محصولات
			</Link>
		</div>
	);
}
export async function getProductSQFromUrl() {
	const sp = getServerSearchParams();
	const sq: any = { __limit: 25 };

	if (sp.get('search')) {
		sq['name'] = String(sp.get('search'));
	}
	if (sp.get('page')) {
		sq['__page'] = String(sp.get('page'));
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

	/* -------------------------- variation properties -------------------------- */
	sp.forEach((val, key) => {
		if (key.startsWith('v-')) {
			sq[key] = val;
		}
	});

	return sq;
}