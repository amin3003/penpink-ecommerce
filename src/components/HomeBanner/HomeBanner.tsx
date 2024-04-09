import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import BannerLayout from '../Sliders/BannerLayout';

const bannerData = [
	{ name: 'nahal', rightButton: false, color: '#006939' },
	{ name: 'owner', rightButton: true, color: '#CF2F2F' },
	{ name: 'papco', rightButton: false, color: '#1867A9' },
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
								<Image
									className="w-full "
									src={`/images/banner/${dataItem.name}-logo.svg`}
									alt={`Banner Image ${dataItem.name}`}
									height={1500}
									width={1000}
									quality={100}
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
										'text-sm flex justify-center items-center',
										'text-[--color]'
									)}
								>
									{/* <i className="bi bi-caret-left-fill"/> */}
									<AiOutlineLeft />
									مشاهده
								</button>
							</Link>
						</div>
						<Image
							className="size-full select-none object-cover rounded-lg"
							src={`/images/banner/${dataItem.name}-banner.svg`}
							alt={`banner`}
							height={1028}
							width={2048}
							quality={100}
						/>
					</div>
				);
			})}
		/>
	);
}
