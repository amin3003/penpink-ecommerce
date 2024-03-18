import Image from 'next/image';
import Link from '@/navigation';
import clsx from 'clsx';

export default function AppLogo(props: {
  className?: string;
  text?: boolean;
  logo?: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href="/"
      className={clsx('flex justify-start items-center', props.className)}
    >
      {props.logo && (
        <Image
          src="/images/logo/f2bed1.svg"
          width={40}
          height={5}
          alt="logo"
        />
      )}

      {props.text && (
        <div className={clsx(props.small ? 'text-sm' : 'text-sm')}>
          <Image
            src="/images/typography/f2bed1.svg"
            width={80}
            height={30}
            alt="logo"
          />
        </div>
      )}
    </Link>
  );
}
