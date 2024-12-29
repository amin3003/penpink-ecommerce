import { DBId, DBManager, ObjectHelper, RequestHelper } from '@azrico/nodeserver';
import { array_isEmpty } from '@azrico/object';
import { OrderProduct, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function deleteProduct(req: NextRequest, data: any) {
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, req, data);
	const targetProduct = await Product.get_single(sq);
	if (!targetProduct) return Error('[404] product not found');

	const orderItems = await DBManager.find(OrderProduct, {
		product_id: DBId.getObjectId(targetProduct.getID()),
	});

	if (!array_isEmpty(orderItems))
		return Error('[400] برای این محصول سفارش ثبت شده و نمیتواند حذف شود');

	return await DBManager.delete(Product, DBId.getIdSearchObject(targetProduct.getID()), {
		user: RequestHelper.getSafeUser(req),
	});
}
