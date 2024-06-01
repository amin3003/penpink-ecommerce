import { headers } from 'next/headers';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import LoginButton from './LoginButton';
import LoginDialogContent from './LoginDialogContent';
import { AzNextHelper } from '@azrico/fetch';
import { SimpleUser } from '@codespase/core';
import DBImage from '../Image/DBImage';

export default function ProfileButton() {
	const userid = headers().get('x-userid');

	return <>{userid ? <UserIcon userid={userid} /> : <LoginButton />}</>;
}
async function UserIcon(props: any) {
	const userObject = await SimpleUser.get_single(props.userid);
	const userimageid = userObject.get('imageid');
	return (
		<button className="btn btn-sm btn-circle !p-0 mx-2">
			<DBImage
				className="rounded-full border-2"
				height={32}
				width={32}
				src={userimageid}
			></DBImage>
		</button>
	);
}
