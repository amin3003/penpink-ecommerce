import Link from 'next/link';
import { SearchBox } from '../SearchBox/SearchBox';
import { IoFilter } from 'react-icons/io5';
import { FaSortAmountDown } from 'react-icons/fa';

export default function Searchbar() {
  const data = [
		{ name: 'گران ترین', url: 'most_expensive' },
		{ name: 'ارزان ترین', url: 'cheapest' },
		{ name: 'جدید ترین', url: 'newest' },
		{ name: 'پرفروش ترین', url: 'most_purchased' },
	];
	return (
		<>
			<div className=" hidden lg:flex justify-between items-center bg-white rounded-lg py-3 px-5 h-16 ">
				<p className="text-xs ">مرتب سازی براساس :</p>
				{data.map((item, index) => {
					return (
						<Link
							key={index}
							className="text-xs bg-white shadow-md p-2 rounded-full"
							href={`?sort=${item.url}`}
						>
							{item.name}
						</Link>
					);
				})}
				<SearchBox className="" />
			</div>
		</>
	);
}
