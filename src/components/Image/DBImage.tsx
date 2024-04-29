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

	const imageContent = (
		<Image
			{...restprops}
			className={props.className}
			src={imgpath}
			alt={props.src ?? ''}
		/>
	);

	if (!src) return <div className={props.className}></div>;
	if (link)
		return (
			<Link href={link} className={props.className}>
				{imageContent}
			</Link>
		);
	return imageContent;
}

export default DBImage;
