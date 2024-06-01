import Link from 'next/link';
import { SearchBox } from '../SearchBox/SearchBox';
import { IoFilter } from 'react-icons/io5';
import { FaSortAmountDown } from 'react-icons/fa';

export default function Searchbar() {
  const data = [
    { name: 'گران ترین', url: 'most_expensive' },
    { name: 'ارزان ترین', url: 'cheapest' },
    { name: 'جدید ترین', url: 'category_location' },
    { name: 'برفروش ترین', url: 'most_purchased' },
  ];
  return (
    <>
      <div className=" hidden lg:flex justify-between gap-2 items-center bg-white rounded-lg py-3 px-5 h-16 ">
        <p className="text-[10px] xl:text-[15px] text-justify">
          مرتب سازی براساس :
        </p>
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              className="text-[10px] text-justify bg-white shadow-md p-2 rounded-full"
              href={`productlist/${item.url}`}
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
