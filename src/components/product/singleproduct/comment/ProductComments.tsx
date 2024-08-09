import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import ProductSection from '../ProductSection';
import SingleComment from './SingleComment';
export default function ProductComments(props: {
	product: Product;
	variation: ProductVariation;
}) {
	const { product } = props;
	//TODO load comments for the selected color only?
	const use_variation = props.variation ?? product.variations[0];

	const comments = [
		{ text: 'خوب بود', rating: 4, user: 'mohammad' },
		{ text: 'عالی! به موقع رسید', rating: 5, user: 'ali' },
		{ text: 'عالی', rating: 5, user: 'reza' },
	];
	//TODO load comments from db
	//TODO send comment component
	//TODO send comment neeeds captcha
	return <></>;
	return (
		<ProductSection text="امتیاز و دیدگاه کاربران">
			<div className="flex flex-col gap-2">
				{comments.map((r, i) => {
					return <SingleComment key={i} comment={r}></SingleComment>;
				})}
			</div>
		</ProductSection>
	);
}
