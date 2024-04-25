import { Product } from '@codespase/core';
import clsx from 'clsx';
import React from 'react';

export const Breadcrumbs = (props: { product?: Product; className?: string }) => {
	const { product } = props;
	const breadcrumbsPath = '';
	return (
		<div className={clsx('pb-1 w-min', props.className)}>
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

			<div className="text-xs breadcrumbs">
				<ul>
					<li>
						<a>خانه</a>
					</li>
					<li>
						<a>محصولات</a>
					</li>
					<li>کتاب ها</li>
				</ul>
			</div>
		</div>
	);
};
