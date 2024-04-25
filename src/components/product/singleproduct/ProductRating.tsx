import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import DBImage from '../../Image/DBImage';
import { array_first, wrap_array } from '@azrico/object';
export default function ProductRating(props: { product: Product }) {
	return (
		<div className="rating h-min">
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
			<input
				type="radio"
				name="rating-2"
				className="mask mask-star-2 bg-orange-400"
				checked
			/>
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
		</div>
	);
}
