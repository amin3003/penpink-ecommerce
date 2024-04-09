// PageHome.tsx
import React from 'react';
import SliderBanner from '@/components/SliderBanner/SliderBanner';
import SliderProduct from '@/components/SliderProduct/SliderProduct';
import { CategoryBlocks } from '@/components/CategoryBlocks/CategoryBlocks';

const bannerData = [
  { name: 'nahal', rightButton: false, color: 'green' },
  { name: 'owner', rightButton: true, color: 'rose' },
  { name: 'papco', rightButton: false, color: 'blue' },
];
const productsData = [
  {
    name: 'bag',
    title: 'کیف',
    desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
    Price: '99',
    off: false,
    firstPrice: '150',
  },
  {
    name: 'perfium',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    off: true,
    firstPrice: '900',
  },
  {
    name: 'shoes',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    off: false,
    firstPrice: '900',
  },
  {
    name: 'bag',
    title: 'کیف',
    desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
    Price: '99',
    off: true,
    firstPrice: '150',
  },
  {
    name: 'perfium',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    off: true,
    firstPrice: '900',
  },
  {
    name: 'shoes',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    off: true,
    firstPrice: '900',
  },
];
export default function PageHome() {

  return (
    <>
      <SliderBanner data={bannerData} />
      <CategoryBlocks />
      <SliderProduct data={productsData} title=" پرفروش ها" />
    </>
  );
}
