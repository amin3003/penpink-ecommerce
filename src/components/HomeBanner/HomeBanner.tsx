import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import BannerLayout from '../Sliders/BannerLayout';
import DBImage from '../Image/DBImage';

const bannerData = [
	{
		name: 'nahal',
		banner: 'nahal-banner.webp',
		logo: 'nahal-logo.webp',
		rightButton: false,
		color: '#006939',
		url: '/products?v-brand=nahal',
	},
	{
		name: 'owner',
		banner: 'owner-banner.webp',
		logo: 'owner-logo.webp',
		rightButton: true,
		color: '#CF2F2F',
		url: '/products?v-brand=owner',
	},
	{
		name: 'papco',
		banner: 'papco-banner.webp',
		logo: 'papco-logo.webp',
		rightButton: false,
		color: '#1867A9',
		url: '/products?v-brand=papco',
	},
];
export default function HomeBanner() {
	return (
		<BannerLayout
			className={'h-[200px] lg:h-[70vh] lg:my-8'}
			content={bannerData.map((dataItem: any, index: number) => {
				return (
					<div
						style={{ '--color': dataItem.color } as any}
						className="size-full px-2 overflow-clip rounded-lg relative"
						key={index}
					>
						<div
							className={clsx(
								`absolute text-[10px] top-[24%] flex flex-col justify-between items-center gap-6`,
								`${dataItem.rightButton ? 'left-[50%]' : 'right-[50%]'} `
							)}
						>
							<div className="w-[50%]">
								<DBImage
									className="w-full "
									src={`${dataItem.logo ?? dataItem.name}`}
									height={1500}
									width={1000}
								/>
							</div>

							<div className="justify-center items-center px-2 hidden lg:flex">
								<b className={clsx(`text-right text-[--color] text-sm`, `text-center`)}>
									{dataItem.name} انواع محصولات برند
								</b>
							</div>
							<Link href={dataItem.url} className="">
								<button
									className={clsx(
										'text-sm flex justify-center items-center bg-white rounded-full px-2 py-1',
										'text-[--color]'
									)}
								>
									<i className="bi bi-caret-left-fill" />
									مشاهده
								</button>
							</Link>
						</div>
						<DBImage
							className="size-full select-none object-cover rounded-lg"
							src={`${dataItem.banner ?? dataItem.name}`}
							height={1028}
							width={2048}
						/>
					</div>
				);
			})}
		/>
	);
}
