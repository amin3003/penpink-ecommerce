import Link from 'next/link';
import { getServerPathname } from '@/navigation';
import Image from 'next/image';

const data = [
  { id: 1, name: 'پیشخوان', link: 'dashboard', icon: 'bi-speedometer2' },
  { id: 2, name: 'اطلاعات حساب', link: 'info', icon: 'bi-person' },
  { id: 3, name: 'سفارش های من', link: 'orders', icon: 'bi-bag' },
  { id: 4, name: 'آدرس های من', link: 'addresses', icon: 'bi-geo-alt' },
  { id: 5, name: 'محصولات ذخیره شده', link: 'wishlist', icon: 'bi-heart' },
  { id: 6, name: 'تغییر رمز عبور', link: 'changePassword', icon: 'bi-lock' },
];

export default function SidebarCu() {
  const pathname = getServerPathname();
  const modifiedPathname = pathname.split('/').slice(1).join('/');

  return (
    <div className="w-full bg-[#fff] shadow-2xl text-black flex flex-col rounded-2xl md:w-56 lg:w-64 mx-0">
      <div className="mx-auto mb-5">
        <div className="relative w-[230px] h-[75px] mx-auto">
          <svg
            className="top-0 right-0 bottom-0 left-0 -z-10 -mt-[10px]"
            width="230"
            height="75"
            viewBox="0 0 230 75"
            fill="none"
          >
            <path
              d="M230 0H0V10C26.2258 10.6605 43.6909 20.4901 52.0499 27.9356C60.4088 35.3811 84.5186 61.9259 84.5186 61.9259C101.038 79.219 128.627 79.219 145.146 61.9259C145.146 61.9259 169.146 35.4578 177.549 28.0042C185.953 20.5506 203.675 10.6625 230 10V0Z"
              fill="url(#paint0_linear)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="115"
                y1="0"
                x2="115"
                y2="74.8957"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f9f9f9" />
                <stop offset="60%" stopColor="#f9f9f9" />
                <stop offset="100%" stopColor="#f9f9f9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative w-[73px] h-[73px] mx-auto top-0 -mt-[80px]">
          <Image
            src={'/images/profile-avatar-2.svg'}
            alt="profile"
            width={73}
            height={73}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="flex justify-center"></div>
      <nav className="flex-1">
        <ul>
          {data.map((item) => (
            <li
              key={item.id}
              className="p-4 text-xs relative group transition-all duration-300 mb-2"
            >
              <Link
                href={item.link}
                className={`flex items-center transition-colors duration-300 ${
                  modifiedPathname === item.link ? 'text-primary' : ''
                } group-hover:text-primary`}
              >
                <i className={`bi ${item.icon} mx-2 my-auto`} />
                {item.name}
              </Link>
              <span
                className={`absolute right-2 top-2 bottom-2 h-auto w-0.5 bg-primary transform ${
                  modifiedPathname === item.link ? 'scale-y-100' : 'scale-y-0'
                } group-hover:scale-y-100 origin-center transition-transform duration-500 rounded`}
              ></span>
            </li>
          ))}
          <hr />
          <li className="p-4 text-xs relative group transition-all duration-300 mb-2">
            <Link
              href={'/'}
              className="flex items-center group-hover:opacity-75 transition-opacity duration-300"
            >
              <i className="bi bi-box-arrow-right mx-2 my-auto" />
              خروج
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
