import React from 'react';
import { Product, ProductVariation } from '@codespase/core';

import clsx from 'clsx';
export default function ProductSection(props: { children: any; text?: string }) {
	return (
		<section className="flex flex-col gap-2">
			{Boolean(props.text) && (
				<div className="sticky top-0 bg-base-100 z-50 rounded-sm">
					<div className="divider ">
						<p className="font-bold self-center">{props.text}</p>
					</div>
				</div>
			)}
			{props.children}
		</section>
	);
}
