import AddToBasket from '@/components/Basket/AddToBasket';

import ProductImageDisplay from '@/components/product/singleproduct/ProductImageDisplay';
import Rating from '@/components/product/Rating';
import VariationSelector from '@/components/product/singleproduct/VariationSelector';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import OurFeatures from '@/components/shared/OurFeatures';
import { Product, ProductVariation } from '@codespase/core';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/product/singleproduct/ProductDetails';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ProductComments from '@/components/product/singleproduct/comment/ProductComments';
 

/**
 * single product page
 */
export default async function Page(props: any) {
	const productId = decodeURIComponent(props.params.id ?? '');

	const product = await Product.get_single(productId);

	if (!productId || !product) {
		return notFound();
	}

	const var_search = {
		variation_data: { color: props.searchParams.color, brand: props.searchParams.brand },
	};
	const variation_list = product.variations;

	const variation =
		variation_list.find((s) => ProductVariation.equals(s, var_search)) ??
		variation_list[0];
	const imageAndVariationBox = (
		<>
			<ProductImageDisplay
				product={product}
				variation={variation}
				className="mx-auto w-max"
			/>
			<VariationSelector product={product} variation={variation} />
		</>
	);
	return (
		<div className="py-0 md:py-14 flex flex-col w-full z-0">
			{/* 20rem sidebar & 1.5rem padding for sidebar & 1rem extra */}
			<Breadcrumbs
				className="self-end w-full px-4 py-4 md:py-1 md:pe-[calc(20rem+1.5rem+1rem)]"
				product={product}
			/>
			<div
				className={clsx(
					'flex flex-row flex-1 gap-8',
					'bg-base-100 rounded-2xl shadow-lg',
					'min-h-[140vh] w-full',
					'p-3 md:p-4 md:pr-6'
				)}
			>
				<section className="flex-1 bg-base-100 p-1 w-[calc(100%-18rem)]">
					<div className="flex flex-col">
						<div className="flex flex-row flex-1 items-center">
							<h1 className={clsx('text-start font-bold flex-1', 'text-lg md:text-2xl')}>
								{product.get('name')}
							</h1>
							<Rating className="hidden md:flex" />
						</div>
						<div className="lg:hidden flex flex-col gap-4 pt-4">
							{imageAndVariationBox}
						</div>
						<p className="text-start py-4">{product.get('short_desc')}</p>
					</div>

					<div id="product-details-area" className="flex flex-col gap-8 pt-8">
						<ProductDetails product={product} variation={variation}>
							<OurFeatures readyToSend={Boolean(Number(variation.get('quantity')) > 0)} />
						</ProductDetails>

						<ProductComments product={product} variation={variation} />
					</div>
				</section>
				<nav
					className={clsx(
						'lg:sticky lg:bottom-[unset] lg:left-[unset] lg:right-[unset] lg:top-5',
						'fixed inset-0 top-[unset]',
						'lg:-mt-14 w-full lg:w-[20rem]',
						'flex flex-col gap-2 h-min z-[10000]'
					)}
				>
					<div
						className={clsx(
							'p-4 bg-base-100 shadow-sm border-[1px]',
							'md:rounded-2xl roundedt-2xl',
							'flex flex-col gap-4'
						)}
					>
						<div className="hidden lg:flex flex-col gap-4">{imageAndVariationBox}</div>
						<AddToBasket showprice product={product} variation={variation} />
					</div>
				</nav>
			</div>
			<RelatedProducts product={product} className="pt-12 pb-24" />
		</div>
	);
}
