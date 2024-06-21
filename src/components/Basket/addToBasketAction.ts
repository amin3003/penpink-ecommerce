'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';

/**
 * add to basket of current user
 * based on current user `uid` (uid is set on `authMiddleware`)
 * @returns true if successful
 */
export default async function addToBasketAction(formData: FormData) {
 
	const res = await AzFetch.post(`@/api/basket`, {
		name: formData.get('name'),
		product_id: formData.get('product_id'),
		variation_id: formData.get('variation_id'),
		quantity: formData.get('quantity'),
	});
	return object_isTrue(object_get(res, 'data.acknowledged'));
}
