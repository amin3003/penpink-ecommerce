import { cookies, headers } from 'next/headers';
import InnrerAdminPage from './InnrerAdminPage';
import { SimpleUser } from '@codespase/core';

export default async function Page() {
	const hd = headers();
	const ck = cookies();
	const token = String(ck.get('token'));
	const currentUser = await SimpleUser.get_single(hd.get('x-userid'));
	if (!currentUser) return 'you are not logged in'; 
	return (
		<InnrerAdminPage
			auth={token}
			user={currentUser.get_basicObject()}
			username={currentUser.username}
		/>
	);
}
