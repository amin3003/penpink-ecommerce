// PageHome.tsx
import React from 'react';
import HomeBanner from '@/components/HomeBanner/HomeBanner';
import ProductSlider from '@/components/product/ProductSlider/ProductSlider';
import { CategoryBlocks } from '@/components/CategoryBlocks/CategoryBlocks';
import { Product } from '@codespase/core';

export default async function PageHome() {
	return (
		<>
			<div className="flex flex-col gap-5">
				<HomeBanner />
				<CategoryBlocks />
				<ProductSlider
					title="جدیدترین ها"
					search={{ __limit: 10, __sort: { _created_date: -1 } }}
				/>
				<ProductSlider
					title="محبوب ترین ها"
					search={{ __limit: 10, __type: 'popular' }}
				/>
				<ProductSlider
					title="محصولات پیشنهادی"
					search={{ __limit: 10, __type: 'suggestions' }}
				/>
			</div>
		</>
	);
};
