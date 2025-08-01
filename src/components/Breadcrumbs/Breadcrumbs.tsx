import { getServerSearchParams } from '@/navigation';
import { wrap_array } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import clsx from 'clsx';
import React from 'react';
export default async function Breadcrumbs(props: {
	product?: Product;
	className?: string;
}) {
	const { product } = props;

	const sq = getServerSearchParams();
	const sqCategory = sq.get('category');

	const current_category = sqCategory
		? await Category.get_single({ slug: sqCategory })
		: undefined;
	const product_count = current_category?.get('_total_product_count') ?? 0;

	//TODO find breadcrumbs based on path
	const breadcrumbsPaths: any[] = [];
	breadcrumbsPaths.push(['خانه', '/']);
	breadcrumbsPaths.push(['محصولات', '/products']);

	if (product) {
		breadcrumbsPaths.push(product.slug || product.name);
	}

	return (
		<div className={clsx('overflow-hidden text-wrap', props.className)}>
			{product == null && (
				<div className="flex flex-col gap-2 justify-center mr-2">
					<b className="text-start" dir="auto">
						{current_category?.get('name') ?? 'محصولات'}
					</b>
					{Boolean(product_count) && (
						<p className="text-xs text-start" dir="auto">
							{`(${product_count} محصول)`}
						</p>
					)}
				</div>
			)}

			<div className="text-xs breadcrumbs" dir="auto">
				<ul className="flex-wrap">
					{breadcrumbsPaths.map((r, i) => {
						const rArray = wrap_array(r);
						const text = rArray.shift();
						const url = rArray.shift();
						if (url == null) return <li key={i}>{text}</li>;
						return (
							<li key={i}>
								<a href={url}>{text}</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
