import React from 'react';
import Image from 'next/image';
import AppLogo from './AppLogo';
import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className="footer flex flex-col items-center p-10 pb-2 bg-neutral text-neutral-content z-0 mt-10">
        {/* <OurFeatures/> */}
        <span className="flex flex-col md:flex-row-reverse gap-4  w-full">
          <span className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1  gap-6 w-full">
            <nav className="flex flex-col items-center mx-auto">
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="flex flex-col items-center mx-auto">
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="flex flex-col items-center mx-auto">
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
            <nav className="flex flex-col items-center mx-auto">
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </span>
          <span className="flex flex-row gap-3">
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
        <hr />
        {/* <span className="text-justify leading-6 mx-auto text-xs" dir="auto">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          می باشد، کتابهای زیا.
        </span> */}
        <AppLogo logo={false} color="f9f5f6" className="" />
        <div className="divider"></div>
        <span className="flex flex-row gap-1">
          <p className="text-[10px]">© Copyright 2024 -</p>
          <Link
            className="text-[10px]"
            href={'https://codespase.vercel.app/en'}
          >
            code spase
          </Link>
        </span>
      </footer>
    </>
  );
};
