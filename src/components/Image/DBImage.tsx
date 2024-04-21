import Image from 'next/image';
import { headers } from 'next/headers';
interface DBImageProps {
	width: number;
	height: number;
	src: string;
	className?: string;
}

export function DBImage(props: DBImageProps) {
	const { src, ...restprops } = props;
	const headersList = headers();
	const basepath = headersList.get('x-forwarded-proto') + '://' + headersList.get('host');
	const imgpath = basepath + '/api/files/' + src;
	return <Image {...restprops} src={imgpath} alt={props.src ?? ''} />;
}

export default DBImage;
