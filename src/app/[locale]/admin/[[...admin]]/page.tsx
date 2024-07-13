import { cookies, headers } from 'next/headers';
import InnrerAdminPage from './InnrerAdminPage';
import { SimpleUser } from '@codespase/core';

export default async function Page() {
	const hd = headers();
	const ck = cookies();
	const token = ck.get('token')?.value ?? '';
	const currentUser = await SimpleUser.get_single(hd.get('x-userid'));
	const basicUser = await currentUser?.get_basicObject();
	return (
		<InnrerAdminPage token={token} user={basicUser} username={currentUser?.username} />
	);
}
