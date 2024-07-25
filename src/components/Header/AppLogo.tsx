import Image from 'next/image';
import Link from '@/navigation';
import clsx from 'clsx';

export default function AppLogo(props: {
  className?: string;
  text?: boolean;
  logo?: boolean;
  color?: String;
  small?: boolean;
}) {
  return (
		<Link href="/" className={clsx('flex justify-start items-center', props.className)}>
			{props.logo ? (
				<Image
					src={`/images/logo/${props.color || 'f2bed1'}.svg`}
					width={30}
					height={5}
					alt="logo"
				/>
			) : (
				<div className={clsx(props.small ? 'text-sm' : 'text-sm')}>
					<Image
						src={`/images/typography/${props.color || 'f2bed1'}.svg`}
						width={80}
						height={30}
						alt="logo"
					/>
				</div>
			)}
		</Link>
	);
}
