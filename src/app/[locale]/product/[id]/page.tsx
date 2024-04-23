import ButtonAddToBasket from '@/components/Basket/ButtonAddToBasket';
import DBImage from '@/components/Image/DBImage';
import { Product } from '@codespase/core';
import clsx from 'clsx';
import { notFound } from 'next/navigation';

/**
 * single product page
 */
export default async function Page(props: any) {
	const productId = props.params.id;
	const product = await Product.get_single(productId);
	if (!productId || !product) {
		return notFound();
	}
	return (
		<div className="flex flex-row min-h-[140vh] py-10 gap-4">
			<section className="border-2 shadow-lg rounded-lg flex-1 bg-base-100 p-4">
				<p className="self-start">Product name</p>
				<div className="divider"></div>
				<p className="self-start">تولید کننده</p>
				<p className="self-start">مشحصات</p>
			</section>
			<nav
				className={clsx(
					'border-2 bg-base-100 rounded-lg shadow-lg h-min p-4',
					'sticky top-5'
				)}
			>
				<p>Product name</p>
				<DBImage
					className="size-[256px]"
					src="imageid"
					height={256}
					width={256}
				></DBImage>
				<ButtonAddToBasket productid={product.getID()} />
			</nav>
		</div>
	);
}
