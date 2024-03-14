import Header from '@/components/Header/AppHeader';
import SliderProduct from '../../../components/SliderProduct/SliderProduct';
import Toggle from '../../../components/SliderProduct/Toggle'
import clsx from 'clsx';
import React from 'react';

export default function PageHome() {
  return (
    <>
      <div>
        <Toggle/>
        <SliderProduct data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]} />
      </div>
    </>
  );
}
