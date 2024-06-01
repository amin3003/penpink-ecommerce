'use server';
import AzFetch from '@azrico/fetch';
import { object_get, object_isTrue } from '@azrico/object';

/**
 * add to basket of current user
 * based on current user `uid` (uid is set on `authMiddleware`)
 * @returns true if successful
 */
export default async function addToBasketAction(formData: FormData) {
	const qtyAction = formData.get('quantity');
	const res = await AzFetch.post(`@/api/basket`, {
		product_id: formData.get('productid'),
		variation_code: formData.get('variationcode'),
		quantity: qtyAction,
	});
	return object_isTrue(object_get(res, 'data.acknowledged'));
}
