import { DBId, DBManager, ObjectHelper } from '@azrico/nodeserver';
import { array_isEmpty, object_clean, object_isEmpty, wrap_array } from '@azrico/object';
import { OrderProduct, Product, ProductVariation } from '@codespase/core';
import Logger from '@azrico/debug';

export async function deleteProduct(...body: any[]) {
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, ...body);
	const targetProduct = await Product.get_single(sq);
	if (!targetProduct) return Error('[404] product not found');

	const orderItems = await DBManager.find(OrderProduct, {
		product_id: DBId.getObjectId(targetProduct.getID()),
	});

	if (!array_isEmpty(orderItems))
		return Error('[400] برای این محصول سفارش ثبت شده و نمیتواند حذف شود');

	return await DBManager.delete(Product, DBId.getIdSearchObject(targetProduct.getID()));
}
