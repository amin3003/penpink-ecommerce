'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';

/**
 * save address to database
 * @param key
 * @param value
 * @returns
 */
export default async function savePreferenceAction(key: string, value: string) {
	const res = await AzFetch.post(`@/api/user_settings`, {
		key: key,
		value: value,
	});
	return object_isTrue(object_get(res, 'data.acknowledged'));
}
