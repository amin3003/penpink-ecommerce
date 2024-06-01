import Image from 'next/image';
import { headers } from 'next/headers';
import { MouseEventHandler } from 'react';
import Link from '@/navigation';
import { array_first } from '@azrico/object';
import clsx from 'clsx';
interface DBImageProps {
	width: number;
	height: number;
	src: string | string[];
	link?: string;
	className?: string;
	divClassName?: string;
}

export function DBImage(props: DBImageProps) {
	const { src, link, ...restprops } = props;
	const headersList = headers();
	const basepath = headersList.get('x-forwarded-proto') + '://' + headersList.get('host');
	const imgpath = basepath + '/api/images/' + src;
	const useSrc = array_first(props.src) ?? '';
	let imageContent = (
		<Image {...restprops} className={clsx(props.className)} src={imgpath} alt={useSrc} />
	);
	if (link)
		imageContent = (
			<Link href={link} className={props.className}>
				{imageContent}
			</Link>
		);

	return imageContent;
}

export default DBImage;
