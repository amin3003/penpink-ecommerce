import { wrap_array } from '@azrico/object';
import { Product } from '@codespase/core';
import clsx from 'clsx';
import React from 'react';

export const Breadcrumbs = (props: { product?: Product; className?: string }) => {
	const { product } = props;
	const breadcrumbsPaths: any[] = [];
	breadcrumbsPaths.push(['خانه', '']);
	breadcrumbsPaths.push(['محصولات', 'products']);
	if (product) {
		breadcrumbsPaths.push(product.slug || product.name);
	}

	return (
		<div className={clsx('overflow-hidden text-wrap', props.className)}>
			{product == null && (
				<div className="flex flex-col justify-center mr-2">
					<b className="text-start" dir="auto">
						دفاتر
					</b>
					<p className="text-xs text-start" dir="auto">
						(5,074 محصول)
					</p>
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
};
