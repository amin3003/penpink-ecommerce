// PageHome.tsx
import React from 'react';
import SliderBanner from '@/components/SliderBanner/SliderBanner';
import SliderProduct from '@/components/SliderProduct/SliderProduct';
import { Category } from '@/components/Category/Category';

const bannerData = [
  { name: 'nahal', rightButton: false },
  { name: 'owner', rightButton: true },
  { name: 'papco', rightButton: false },
];
const productsData = [
  {
    name: 'bag',
    title: 'کیف',
    desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
    Price: '99',
    // off: '۲۰٪',
    firstPrice: '150',
  },
  {
    name: 'perfium',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    // off: '۱۵٪',
    firstPrice: '900',
  },
  {
    name: 'shoes',
    title: 'کفش',
    desc: 'کفش اسپرت زنانه با رویه یکپارچه و زیره اسفت',
    Price: '150',
    // off: '۱۰٪',
    firstPrice: '1500',
  },
  {
    name: 'bag',
    title: 'کتاب ریاضی هفتم',
    desc: 'کتاب ریاضی هفتم سر تا پایه گاج',
    Price: '500',
    off: '۲۰٪',
    firstPrice: '4000',
  },
  {
    name: 'perfium',
    title: 'پیراهن مردانه',
    desc: 'پیراهن مردانه با طراحی شیک و راحتی بالا',
    Price: '500',
    off: '۱۵٪',
    firstPrice: '1500',
  },
  {
    name: 'shoes',
    title: 'لباس زنانه',
    desc: 'لباس زنانه با طراحی جذاب و مناسب برای مجالس',
    Price: '500',
    off: '۱۰٪',
    firstPrice: '1500',
  },
  {
    name: 'bag',
    title: 'کیف',
    desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
    Price: '99',
    // off: '۲۰٪',
    firstPrice: '150',
  },
  {
    name: 'perfium',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    // off: '۱۵٪',
    firstPrice: '900',
  },
  {
    name: 'shoes',
    title: 'کفش',
    desc: 'کفش اسپرت زنانه با رویه یکپارچه و زیره اسفت',
    Price: '150',
    // off: '۱۰٪',
    firstPrice: '1500',
  },
  {
    name: 'bag',
    title: 'کتاب ریاضی هفتم',
    desc: 'کتاب ریاضی هفتم سر تا پایه گاج',
    Price: '500',
    off: '۲۰٪',
    firstPrice: '4000',
  },
  {
    name: 'perfium',
    title: 'پیراهن مردانه',
    desc: 'پیراهن مردانه با طراحی شیک و راحتی بالا',
    Price: '500',
    off: '۱۵٪',
    firstPrice: '1500',
  },
  {
    name: 'shoes',
    title: 'لباس زنانه',
    desc: 'لباس زنانه با طراحی جذاب و مناسب برای مجالس',
    Price: '500',
    off: '۱۰٪',
    firstPrice: '1500',
  },
  {
    name: 'bag',
    title: 'کیف',
    desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
    Price: '99',
    // off: '۲۰٪',
    firstPrice: '150',
  },
  {
    name: 'perfium',
    title: 'ادکلن',
    desc: 'ادکلن مردانه با بوی خنک و خوشبو',
    Price: '200',
    // off: '۱۵٪',
    firstPrice: '900',
  },
  {
    name: 'shoes',
    title: 'کفش',
    desc: 'کفش اسپرت زنانه با رویه یکپارچه و زیره اسفت',
    Price: '150',
    // off: '۱۰٪',
    firstPrice: '1500',
  },
  {
    name: 'bag',
    title: 'کتاب ریاضی هفتم',
    desc: 'کتاب ریاضی هفتم سر تا پایه گاج',
    Price: '500',
    off: '۲۰٪',
    firstPrice: '4000',
  },
  {
    name: 'perfium',
    title: 'پیراهن مردانه',
    desc: 'پیراهن مردانه با طراحی شیک و راحتی بالا',
    Price: '500',
    off: '۱۵٪',
    firstPrice: '1500',
  },
  {
    name: 'shoes',
    title: 'لباس زنانه',
    desc: 'لباس زنانه با طراحی جذاب و مناسب برای مجالس',
    Price: '500',
    off: '۱۰٪',
    firstPrice: '1500',
  },
];
export default function PageHome() {

  return (
    <>
      <SliderBanner data={bannerData} />
      <Category/>
      <SliderProduct data={productsData} title=" پرفروش ها" />
    </>
  );
}
