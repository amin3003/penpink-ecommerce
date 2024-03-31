// PageHome.tsx
import React from 'react';
import SliderBanner from '@/components/SliderBanner/SliderBanner';
import SliderProduct from '../../../components/SliderProduct/SliderProduct';

export default function PageHome() {
  const bannerData = ['nahal', 'owner', 'papco'];
  const productsData = [
    {
      name: 'bag',
      title: 'کیف',
      desc: 'کیف بافت ریز پارچه‌ای و بند چرمی',
      Price: '۹۹,۰۰۰',
      // off: '۲۰٪',
      firstPrice: '۱۵۰,۰۰۰',
    },
    {
      name: 'perfium',
      title: 'ادکلن',
      desc: 'ادکلن مردانه با بوی خنک و خوشبو',
      Price: '۱۲۰,۰۰۰',
      // off: '۱۵٪',
      firstPrice: '۱۴۰,۰۰۰',
    },
    {
      name: 'shoes',
      title: 'کفش',
      desc: 'کفش اسپرت زنانه با رویه یکپارچه و زیره اسفت',
      Price: '۱۵۰,۰۰۰',
      // off: '۱۰٪',
      firstPrice: '۱۶۵,۰۰۰',
    },
    {
      name: 'bag',
      title: 'کتاب ریاضی هفتم',
      desc: 'کتاب ریاضی هفتم سر تا پایه گاج',
      Price: '۹۹,۰۰۰',
      off: '۲۰٪',
      firstPrice: '۱۵۰,۰۰۰',
    },
    {
      name: 'perfium',
      title: 'پیراهن مردانه',
      desc: 'پیراهن مردانه با طراحی شیک و راحتی بالا',
      Price: '۱۲۰,۰۰۰',
      off: '۱۵٪',
      firstPrice: '۱۴۰,۰۰۰',
    },
    {
      name: 'shoes',
      title: 'لباس زنانه',
      desc: 'لباس زنانه با طراحی جذاب و مناسب برای مجالس',
      Price: '۱۵۰,۰۰۰',
      off: '۱۰٪',
      firstPrice: '۱۶۵,۰۰۰',
    },
  ];


  return (
    <>
      <SliderBanner data={bannerData} />
      {/* <Toggle /> */}
      <SliderProduct data={productsData} />
    </>
  );
}
