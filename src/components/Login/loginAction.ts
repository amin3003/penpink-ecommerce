'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';
import { cookies } from 'next/headers';

/**
 * add to basket of current user
 * based on current user `uid` (uid is set on `authMiddleware`)
 * @returns
 */
export default async function loginAction(formData: FormData) {
	const res = (await AzFetch.post(`@/api/auth`, {
		isLogin: object_isTrue(formData.get('login')),
		user: formData.get('username'),
		email: formData.get('email'),
		pass: formData.get('password'),
		name: formData.get('name'),
	})) as any;
	const token = object_get(res, 'data.token');
	if (token) cookies().set('token', token);
	return res;
}
