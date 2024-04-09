// PageHome.tsx
import React from 'react';
import SliderBanner from '@/components/SliderBanner/SliderBanner';
import ProductSlider from '@/components/product/SliderProduct/SliderProduct';
import { CategoryBlocks } from '@/components/CategoryBlocks/CategoryBlocks';
import { Product } from '@codespase/core';

const bannerData = [
	{ name: 'nahal', rightButton: false, color: 'green' },
	{ name: 'owner', rightButton: true, color: 'rose' },
	{ name: 'papco', rightButton: false, color: 'blue' },
];

export default async function PageHome() {
	const dbProducts = await Product.get_list();
	console.log(dbProducts);
	return (
		<>
			<SliderBanner data={bannerData} />
			<CategoryBlocks />
			<ProductSlider data={dbProducts} title=" پرفروش ها" />
		</>
	);
};
