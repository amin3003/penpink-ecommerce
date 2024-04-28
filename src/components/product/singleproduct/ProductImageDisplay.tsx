import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import DBImage from '../../Image/DBImage';
import { array_first, wrap_array } from '@azrico/object';
import clsx from 'clsx';
export default function ProductImageDisplay(props: {
	product: Product;
	variation: ProductVariation;
	className?: string;
}) {
	const { product } = props;
	const use_variation = props.variation ?? product.variations[0];
	const imagesArr = wrap_array(use_variation.images);
	const default_image = array_first(imagesArr);
	return (
		<div className={clsx('flex flex-col md:flex-row gap-2 w-max', props.className)}>
			<figure className="m-auto border-2 rounded-lg shadow-sm overflow-hidden aspect-square">
				<DBImage
					className="size-[240px]"
					src={default_image ?? ''}
					height={1024}
					width={1024}
				/>
			</figure>
			<ul className="flex flex-col gap-2 w-max">
				{imagesArr.map((img) => {
					return (
						<DBImage
							key={img}
							className="size-[64px] border-2 rounded-lg aspect-square"
							src={img}
							height={256}
							width={256}
						/>
					);
				})}
			</ul>
		</div>
	);
}
