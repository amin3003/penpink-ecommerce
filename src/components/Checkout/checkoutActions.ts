'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';

/**
 * save address to database
 * @param key
 * @param value
 * @returns
 */
export async function saveAddressAction(addressJson: string): Promise<string | boolean> {
	const res = await AzFetch.post(`@/api/address`, JSON.parse(addressJson));
	if (object_isTrue(object_get(res, 'data.acknowledged'))) return true;
	return object_get(res, 'data.error', 'error');
}
/**
 * verify order of current user
 * @returns ID of order or false for errors
 */
export async function saveOrderAction(): Promise<false | string> {
	const res = await AzFetch.post(`@/api/basket/verify`, {});
	const idValue = String(object_get(res, 'data._index_value', 'data._id'));
	if (Boolean(idValue)) return idValue;
	return false;
}
export async function submitPaymentAction(order: string, payment_code: string) {
	const res = await AzFetch.post(`@/api/orderSubmitCode/${order}`, {
		payment_code: payment_code,
	}); 
	 
	return res.data;
}
