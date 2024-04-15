// PageHome.tsx
import React from 'react';
import HomeBanner from '@/components/HomeBanner/HomeBanner';
import ProductSlider from '@/components/product/SliderProduct/SliderProduct';
import { CategoryBlocks } from '@/components/CategoryBlocks/CategoryBlocks';
import { Product } from '@codespase/core';

export default async function PageHome() {
	const dbProducts = await Product.get_list();
	return (
		<>
			<div className="flex flex-col gap-5">
				<HomeBanner />
				<CategoryBlocks />
				<ProductSlider data={dbProducts} title=" پرفروش ها" />
				<ProductSlider data={dbProducts} title="Popular" />
				<ProductSlider data={dbProducts} title="Best" />
				<ProductSlider data={dbProducts} title="Top" />
			</div>
		</>
	);
};
