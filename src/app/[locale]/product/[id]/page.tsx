import AddToBasketButton from '@/components/Basket/AddToBasketButton';
import DBImage from '@/components/Image/DBImage';
import ProductBrand from '@/components/product/Brand/ProductBrand';
import ProductImageDisplay from '@/components/product/ProductImageDisplay';
import ProductRating from '@/components/product/ProductRating';
import ProductVariationSelector from '@/components/product/ProductVariationSelector';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import OurFeatures from '@/components/shared/OurFeatures';
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
		<div className="py-14 flex flex-col w-full gap-8">
			<div
				className={clsx(
					'flex flex-row flex-1 gap-8 p-4 pr-6',
					' bg-base-100 rounded-2xl shadow-lg',
					' min-h-[140vh] w-full'
				)}
			>
				<section className="flex-1 bg-base-100 p-1 w-[calc(100%-18rem)]" dir="rtl">
					<div className="flex flex-col">
						<div className="flex flex-row flex-1 items-center">
							<h1 className="text-start font-bold text-2xl flex-1">
								{product.get('name')}
							</h1>
							<ProductRating product={product} />
						</div>
						<p className="text-start">{product.get('short_desc')}</p>
					</div>

					<div className="divider"></div>
					<ProductBrand product={product} variation={variation} />
					<OurFeatures />
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
			<RelatedProducts product={product} />
		</div>
	);
}
