import React from 'react';
import SwiperLayout from '../Sliders/SwiperLayout';
import Image from 'next/image';
import Link from '@/navigation';
import DBImage from '../Image/DBImage';

const data = [
	{ title: 'FaberCastell', image: 'FaberCastell.webp' },
	{ title: 'Staedtler', image: 'Staedtler.webp' },
	{ title: 'Pentel', image: 'Pentel.webp' },
	{ title: 'Maped', image: 'Maped.webp' },
	{ title: 'BIC', image: 'Bic.webp' },
	{ title: 'Lamy', image: 'Lamy.webp' },
	{ title: 'Pilot', image: 'Pilot.webp' },
	{ title: 'UniBall', image: 'Uniball.webp' },
	{ title: 'Rifle', image: 'Rifle.webp' },
	{ title: 'Moleskine', image: 'Moleskine.webp' },
];
export const BrandSlider = () => {
	return (
		<div>
			<SwiperLayout
				className={'w-full'}
				enableAutoplay={true}
				content={data.map((r: any, index: any) => {
					return (
						<Link key={index} href={`/products?v-brand=${String(r.title).toLowerCase()}`}>
							<div className="w-32 h-32 !rounded-[50%] bg-white flex items-center justify-center">
								<DBImage
									src={r.image}
									height={256}
									width={256}
									className="rounded-full"
								/>
							</div>
						</Link>
					);
				})}
			/>
		</div>
	);
};
