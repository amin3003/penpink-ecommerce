import AddToBasketButton from '@/components/Basket/AddToBasketButton';
import DBImage from '@/components/Image/DBImage';
import ProductImageDisplay from '@/components/product/ProductImageDisplay';
import ProductVariationSelector from '@/components/product/ProductVariationSelector';
import { ServerApi } from '@azrico/nodeserver';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import { notFound } from 'next/navigation';

/**
 * single product page
 */
export default async function Page(props: any) {
	const productId = props.params.id;

	ServerApi.show_logs = true;
	const product = await Product.get_single(productId);

	if (!productId || !product) {
		return notFound();
	}

	const variation_id = props.searchParams.variation;
	const variation_list = product.variations;
	const variation =
		variation_list.find((s) => ProductVariation.equals(s, variation_id)) ??
		variation_list[0];

	return (
		<div className="py-14 flex">
			<div
				className={clsx(
					'flex flex-1 flex-row min-h-[140vh] gap-4 p-4',
					' bg-base-100 rounded-2xl shadow-lg'
				)}
			>
				<section className="flex-1 bg-base-100 p-1">
					<p className="self-start">{product.get('name')}</p>
					<div className="divider"></div>
					<p className="self-start">تولید کننده</p>
					<p className="self-start">مشحصات</p>
				</section>
				<nav className={clsx('sticky top-5 -mt-14 w-72', 'flex flex-col gap-2 h-min')}>
					<div
						className={clsx(
							'p-4 bg-base-100 rounded-2xl shadow-sm',
							'flex flex-col gap-3'
						)}
					>
						<ProductImageDisplay product={product} variation={variation} />
						<ProductVariationSelector product={product} variation={variation} />
						<AddToBasketButton showprice product={product} variation={variation} />
					</div>
				</nav>
			</div>
		</div>
	);
}
