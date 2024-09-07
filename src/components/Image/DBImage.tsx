import Image from 'next/image';
import { headers } from 'next/headers';
import { MouseEventHandler } from 'react';
import Link, { getServerHost } from '@/navigation';
import { array_first } from '@azrico/object';
import clsx from 'clsx';
interface DBImageProps {
	children?: any;
	width: number;
	height: number;
	src: string | string[];
	link?: string;
	className?: string;
	divClassName?: string;
}

export function DBImage(props: DBImageProps) {
	const { src, link, ...restprops } = props;
	const basepath = getServerHost();
	const useSrc = array_first(props.src);

	/**
	 * if no image was found use the default image
	 */
	const defaultImage = basepath + '/api/images/noimage.svg';
	const imgpath = useSrc ? String(basepath + '/api/images/' + useSrc) : defaultImage;

	let imageContent = (
		<Image
			{...restprops}
			className={clsx(props.className)}
			src={imgpath}
			alt={defaultImage}
			// placeholder="blur"
			// blurDataURL
		/>
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
