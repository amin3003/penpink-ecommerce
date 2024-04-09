// SliderProduct.tsx
import Image from 'next/image';
import SwiperLayout from '../../Sliders/SwiperLayout';
import { ProductCard } from '../ProductCard/CardProduct';
import { Product } from '@codespase/core';

interface ProductSliderProps {
	data: Product[];
	className?: string;
	title?: string;
}

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default function ProductSlider(props: ProductSliderProps) {
	return (
		<>
			<div className="mx-5 flex flex-col gap-2 justify-center" dir="rtl">
				<span className="flex gap-2 items-center">
					<i className="bi bi-circle-fill"></i>
					{props.title}
				</span>
				<hr className="w-full my-2 border-gray-300" />
			</div>
			<SwiperLayout
				className={props.className}
				content={props.data.map((r: any, index: any) => {
					return <ProductCard key={index} product={r} />;
				})}
			/>
		</>
	);
}
