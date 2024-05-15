import SwiperLayout from '../../Sliders/SwiperLayout';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '@codespase/core';
import Link from '@/navigation';
import { sanitize_slug } from '@azrico/string';
import { BiSolidShow } from 'react-icons/bi';

interface ProductSliderProps {
	className?: string;
	title?: string;
	search?: any;
	hideHeader?: boolean;
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
    <section className="w-full" dir="auto">
      {!props.hideHeader && (
			  <div className="flex flex-col justify-center items-center w-full">
		  <span className="flex items-center justify-around md:justify-between w-full">
            <span className="gap-2 text-[12px] ">
              <i className="bi bi-circle-fill px-2 text-primary"></i>
              {props.title}
            </span>
            <span className="flex items-center justify-end gap-2 text-[12px] bg-white px-2 py-1 rounded-md">
              <Link
                className="!no-underline"
                href={`/products?type=${title_slug}`}
              >
                {'نمایش بیشتر'}
              </Link>
              <BiSolidShow />
            </span>
          </span>
          <div className='divider h-[1px] w-[70%] md:w-full mx-auto'/>
        </div>
      )}

      <SwiperLayout
        className={'w-full'}
        content={data.map((r: any, index: any) => {
          return <ProductCard className={''} key={index} product={r} />;
        })}
      />
    </section>
  );
}
