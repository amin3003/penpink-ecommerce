import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import BannerLayout from '../Sliders/BannerLayout';
import DBImage from '../Image/DBImage';

const bannerData = [
	{
		name: 'nahal',
		banner: 'nahal-banner.png',
		logo: 'nahal-logo.png',
		rightButton: false,
		color: '#006939',
	},
	{
		name: 'owner',
		banner: 'owner-banner.png',
		logo: 'owner-logo.png',
		rightButton: true,
		color: '#CF2F2F',
	},
	{
		name: 'papco',
		banner: 'papco-banner.png',
		logo: 'papco-logo.png',
		rightButton: false,
		color: '#1867A9',
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
							<Link href={'#'} className="">
								<button
									className={clsx(
										'text-sm flex justify-center items-center bg-white rounded-full px-2 py-1',
										'text-[--color]'
									)}
								>
									{/* <i className="bi bi-caret-left-fill"/> */}
									<AiOutlineLeft />
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
