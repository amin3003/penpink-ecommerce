'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';

/**
 * save address to database
 * @param key
 * @param value
 * @returns
 */
export async function savePreferenceAction(key: string, value: string) {
	const res = await AzFetch.post(`@/api/user_settings`, {
		key: key,
		value: value,
	});
	return object_isTrue(object_get(res, 'data.acknowledged'));
}
/**
 * verify order of current user
 * @returns
 */
export async function saveOrderAction() {
	const res = await AzFetch.post(`@/api/basket/verify`, {});
	const idValue = object_get(res, 'data._id', 'data._index_value');
	if (Boolean(idValue)) return res.data;
	return false;
}
export async function submitPaymentAction(order: string, payment_code: string) {
	const res = await AzFetch.post(`@/api/orderSubmitCode/${order}`, {
		payment_code: payment_code,
	}); 
	 
	return res.data;
}
