import AddToBasketButton from '@/components/Basket/AddToBasketButton';
import DBImage from '@/components/Image/DBImage';
import ProductBrand from '@/components/product/singleproduct/ProductBrand';
import ProductImageDisplay from '@/components/product/singleproduct/ProductImageDisplay';
import Rating from '@/components/product/Rating';
import VariationSelector from '@/components/product/singleproduct/VariationSelector';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import OurFeatures from '@/components/shared/OurFeatures';
import { ServerApi } from '@azrico/nodeserver';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/product/singleproduct/ProductDetails';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import ProductComments from '@/components/product/singleproduct/comment/ProductComments';

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
		<div className="py-14 flex flex-col w-full">
			{/* 18rem sidebar & 1.5rem padding for sidebar & 1rem extra */}
			<Breadcrumbs className="self-end pe-[calc(18rem+1.5rem+1rem)]" header={false} />
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
							<Rating />
						</div>
						<p className="text-start">{product.get('short_desc')}</p>
					</div>

					<div className="flex flex-col gap-8 pt-8">
						<ProductDetails product={product} variation={variation}>
							<OurFeatures />
						</ProductDetails>

						<ProductComments product={product} variation={variation}></ProductComments>
					</div>
				</section>
				<nav className={clsx('sticky top-5 -mt-14 w-72', 'flex flex-col gap-2 h-min')}>
					<div
						className={clsx(
							'p-4 bg-base-100 rounded-2xl shadow-sm border-[1px]',
							'flex flex-col gap-3'
						)}
					>
						<ProductImageDisplay product={product} variation={variation} />
						<VariationSelector product={product} variation={variation} />
						<AddToBasketButton showprice product={product} variation={variation} />
					</div>
				</nav>
			</div>
			<RelatedProducts product={product} className="pt-12" />
		</div>
	);
}
