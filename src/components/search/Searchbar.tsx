import Link from "next/link";
import { SearchBox } from "../SearchBox/SearchBox";

export default function Searchbar() {
	return (
    <div className=" hidden lg:flex justify-between items-center bg-white rounded-lg py-3 px-5 h-16 ">
      <p className="text-xs ">مرتب سازی براساس :</p>
      <Link
        className="text-xs bg-white shadow-md p-2 rounded-full"
        href={'#new-link'}
      >
        گران ترین{' '}
      </Link>
      <Link
        className="text-xs bg-white shadow-md p-2 rounded-full"
        href={'#new-link'}
      >
        ارزان ترین
      </Link>
      <Link
        className="text-xs bg-white shadow-md p-2 rounded-full"
        href={'#new-link'}
      >
        جدید ترین
      </Link>
      <Link
        className="text-xs bg-white shadow-md p-2 rounded-full"
        href={'#new-link'}
      >
        برفروش ترین
      </Link>
      <SearchBox />
    </div>
  );
}
