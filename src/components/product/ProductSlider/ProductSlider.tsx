import Image from 'next/image';
import SwiperLayout from '../../Sliders/SwiperLayout';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '@codespase/core';
import Link from '@/navigation';
import { sanitize_slug } from '@azrico/string';

interface ProductSliderProps {
	className?: string;
	title?: string;
	search?: any;
}

/**
 * shows a list of products as slider with a title
 * @param props
 * @returns
 */
export default async function ProductSlider(props: ProductSliderProps) {
	const data = await Product.get_list(props.search);
	const title_slug = sanitize_slug(props.title);
	return (
		<section className="w-full">
			<div className="px-5 py-2 grid grid-cols-2 w-full" dir="rtl">
				<span className="gap-2">
					<i className="bi bi-circle-fill px-2"></i>
					{props.title}
				</span>
				<span className="col-start-2 text-end link">
					<Link href={`/products?type=${title_slug}`}>View More</Link>
				</span>
				<hr className="row-start-2 col-span-2 my-2 border-gray-300 row-span-2" />
			</div>
			<SwiperLayout
				className={'w-full'}
				content={data.map((r: any, index: any) => {
					return <ProductCard key={index} product={r} />;
				})}
			/>
		</section>
	);
}
