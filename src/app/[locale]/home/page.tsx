// PageHome.tsx
import React from 'react';
import HomeBanner from '@/components/HomeBanner/HomeBanner';
import ProductSlider from '@/components/product/ProductSlider/ProductSlider';
import { CategoryBlocks } from '@/components/CategoryBlocks/CategoryBlocks';
import { Product } from '@codespase/core';
import {Shape} from '@/components/Shape/Shape';
import { BrandSlider } from '@/components/BrandSlider/BrandSlider';
import Discount from '@/components/Discount/Discount';
import { FreqQuestions } from '@/components/FreqQuestions/FreqQuestions';
export default async function PageHome() {
	return (
    <>
      <div className="flex flex-col gap-16">
        <HomeBanner />
        <CategoryBlocks />
        <ProductSlider
          title="جدیدترین ها"
          search={{ __limit: 10, __sort: { _created_date: -1 } }}
        />
        <BrandSlider />
        <ProductSlider
          title="محبوب ترین ها"
          search={{ __limit: 10, __type: 'popular' }}
        />
        <Discount
          className={''}
          search={{ __limit: 5, __sort: { _created_date: -1 } }}
        />
        <ProductSlider
          title="محصولات پیشنهادی"
          search={{ __limit: 10, __type: 'suggestions' }}
        />
        <FreqQuestions />
      </div>
    </>
  );
};
