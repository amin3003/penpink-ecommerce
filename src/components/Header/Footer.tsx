import React from 'react';
import Image from 'next/image';
import AppLogo from './AppLogo';
import Link from 'next/link';
import NavSection from './NavSection';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    {
      title: 'خدمات',
      links: ['برندینگ', 'طراحی', 'بازاریابی', 'تبلیغات'],
    },
    {
      title: 'شرکت',
      links: ['درباره ما', 'تماس', 'فرصت‌های شغلی', 'مجموعه مطبوعات'],
    },
    {
      title: 'قانونی',
      links: ['شرایط استفاده', 'سیاست حفظ حریم خصوصی', 'سیاست کوکی‌ها'],
    },
    {
      title: 'شرکت',
      links: ['درباره ما', 'تماس', 'فرصت‌های شغلی', 'مجموعه مطبوعات'],
    },
  ];

  return (
    <>
      <footer className="footer flex flex-col items-center p-10 pb-2 bg-neutral text-neutral-content z-0 mt-10">
        {/* <OurFeatures/> */}
        <span className="flex flex-col justify-center items-center md:flex-row-reverse gap-4  w-full">
          <span className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1  gap-6 w-full">
            {footerLinks.map((section, index) => (
              <nav className="flex flex-col items-center mx-auto">
                <NavSection
                  key={index}
                  title={section.title}
                  links={section.links}
                />
              </nav>
            ))}
          </span>
          <span className="flex flex-row items-center justify-between gap-3">
            <Image
              src="/images/namad1.png"
              alt="Picture of the author"
              width={80}
              height={90}
              quality={100}
            />
            <Image
              src="/images/namad2.png"
              alt="Picture of the author"
              width={80}
              height={90}
              quality={100}
            />
            <Image
              src="/images/namad3.png"
              alt="Picture of the author"
              width={80}
              height={90}
              quality={100}
            />
          </span>
        </span>
        {/* <div className="divider">درباره ما</div> */}
        {/* <span className="text-justify leading-6 mx-auto text-xs" dir="auto">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          می باشد، کتابهای زیا.
        </span> */}
        <AppLogo logo={false} color="f9f5f6" className="" />

        <span className="flex flex-row gap-1">
          <p className="text-[10px] text-center mb-4">
            {`Copyright © ${
              currentYear != 2024 ? `2024-${currentYear}` : currentYear
            } All right reserved`}
            <br />
            create by{' '}
            <Link
              className={'!underline'}
              href={'https://codespase.vercel.app/en'}
              rel="noopener noreferrer"
              target="_blank"
            >
              code space
            </Link>
          </p>
        </span>
      </footer>
    </>
  );
};
