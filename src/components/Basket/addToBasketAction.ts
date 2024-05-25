'use server';
import AzFetch from '@azrico/fetch';

/**
 * add to basket of current user
 * based on current user `uid` (uid is set on `authMiddleware`)
 * @returns
 */
export default async function addToBasketAction(formData: FormData) {
	const qtyAction = formData.get('quantity');
	return await AzFetch.post(`@/api/basket`, {
		product_id: formData.get('productid'),
		variation_code: formData.get('variationcode'),
		quantity: qtyAction,
	});
}
