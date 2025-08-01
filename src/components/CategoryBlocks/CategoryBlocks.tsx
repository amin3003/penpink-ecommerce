import Link from 'next/link';
import React from 'react';
import DBImage from '../Image/DBImage';
import { Category } from '@codespase/core';

interface CategoryProps {
	className?: string;
	title?: string;
}

export async function CategoryBlocks(props: CategoryProps) {
	const loaded_categories: Category[] = await Category.get_list({ pinned: true });

	return (
		<>
			<div className="grid py-5 md:px-4 lg:px-0 grid-cols-2 gap-3 md:grid-cols-4 md:gap-16 w-full justify-items-center hover:border-pink-700">
				{loaded_categories.map((item, index) => {
					return (
						<Link key={index} href={`/products?category=${item.slug}`}>
							<div
								className="relative size-24 md:size-32 flex justify-center items-center bg-white  shadow-md rounded-lg" // Add styling for box
							>
								<div className="absolute bg-black opacity-30 inset-0 rounded-lg"></div>
								<b className="absolute text-lg md:text-xl text-white">{item.name}</b>
								<div className="size-20 md:size-24">
									<DBImage
										className="w-full h-full object-contain" // Adjust for aspect ratio
										src={item.images ?? ''}
										width={512}
										height={512}
									/>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
export const dynamic = 'force-dynamic';
