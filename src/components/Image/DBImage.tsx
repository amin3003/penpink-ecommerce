import Image from 'next/image';
import { headers } from 'next/headers';
import { MouseEventHandler } from 'react';
import Link from '@/navigation';
interface DBImageProps {
	width: number;
	height: number;
	src: string;
	link?: string;
	className?: string;
	divClassName?: string;
}

export function DBImage(props: DBImageProps) {
	const { src, link, ...restprops } = props;
	const headersList = headers();
	const basepath = headersList.get('x-forwarded-proto') + '://' + headersList.get('host');
	const imgpath = basepath + '/api/images/' + src;

	let imageContent = (
		<Image
			{...restprops}
			className={props.className}
			src={imgpath}
			alt={props.src ?? ''}
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
