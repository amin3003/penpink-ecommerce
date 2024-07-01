import { cookies, headers } from 'next/headers';
import InnrerAdminPage from './InnrerAdminPage';
import { SimpleUser } from '@codespase/core';

export default async function Page() {
	const hd = headers();
	const ck = cookies();
	const token = ck.get('token')?.value ?? '';
	const currentUser = await SimpleUser.get_single(hd.get('x-userid'));
	 
	return (
		<InnrerAdminPage
			token={token}
			user={await currentUser.get_basicObject()}
			username={currentUser.username}
		/>
	);
}
