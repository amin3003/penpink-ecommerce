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
				<ProductSlider title="پرفروش ترین ها" search={{ __limit: 25, __type: 'sales' }} />
				<ProductSlider title="محصولات ویژه" search={{ __limit: 25, __type: 'hot' }} />
				<ProductSlider
					title="محبوب ترین ها"
					search={{ __limit: 25, __type: 'popular' }}
				/>
				<ProductSlider
					title="محصولات پیشنهادی"
					search={{ __limit: 25, __type: 'suggestions' }}
				/>
			</div>
		</>
	);
};
