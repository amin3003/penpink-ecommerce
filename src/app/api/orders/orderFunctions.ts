import { DBId, DBManager } from '@azrico/nodeserver';
import { object_isEmpty } from '@azrico/object';
import { Order, OrderProduct } from '@codespase/core';

export async function saveOrder(order: Order, canInsert = false) {
	const idSq = DBId.getIdSearchObject(order);
	if (object_isEmpty(idSq) && !canInsert) return Error('[404] cant save this order');

	const orderBody = await order.get_deltaObject({ allProperties: true });
	const orderProducts = order.get('items') as OrderProduct[];
	delete orderBody.items;

	const orderRes = (await DBManager.upsert(Order.get_dbname(), idSq, orderBody)) as any;
	const orderId = DBId.getObjectIdList([orderRes, idSq]).shift();

	/* ------------------------------- save items ------------------------------- */
	// if (orderProducts.length > 0) {
	// 	orderProducts.forEach((pr) => {
	// 		pr.order_id = orderId;
	// 	});
	// 	const itemBodies = await Promise.all(
	// 		orderProducts.map(async (r) => await r.get_deltaObject({ allProperties: true }))
	// 	);
	// 	console.log(itemBodies);
	// 	const itemsRes = await DBManager.insert(OrderProduct.get_dbname(), {
	// 		__save_list: itemBodies,
	// 	});
	// }
	return orderRes;
}
export async function createOrder(order: Order) {
	const orderBody = await order.get_deltaObject({ allProperties: true });
	const orderProducts = order.get('items') as OrderProduct[];
	delete orderBody.items;
	/* ------------------------------- save order ------------------------------- */
	const orderRes = (await DBManager.insert(Order.get_dbname(), orderBody)) as any;
	const orderId = DBId.get_id(orderRes);

	/* ------------------------------- save items ------------------------------- */
	if (orderProducts.length > 0) {
		orderProducts.forEach((pr) => {
			pr.order_id = orderId;
		});

		const itemBodies = await Promise.all(
			orderProducts.map(async (r) => await r.get_deltaObject({ allProperties: true }))
		);

		const itemsRes = await DBManager.insert(OrderProduct.get_dbname(), {
			__save_list: itemBodies,
		});
	}
	//TODO verify itemRes
	return orderRes;
}
