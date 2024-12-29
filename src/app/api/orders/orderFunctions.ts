import AzFetch from '@azrico/fetch';
import { AuthHelper, DBId, DBManager } from '@azrico/nodeserver';
import { object_isEmpty } from '@azrico/object';
import { Order, OrderProduct } from '@codespase/core';
import Logger from '@azrico/debug';
import { sendOrderMail } from '../email/mailFunctions';

export async function saveOrder(order: Order, canInsert = false) {
	const idSq = DBId.getIdSearchObject(order);
	if (object_isEmpty(idSq) && !canInsert) return Error('[404] cant save this order');

	const orderBody = await order.get_deltaObject({ allProperties: true });
	const orderProducts = order.get('items') as OrderProduct[];
	delete orderBody.items;

	const orderRes = (await DBManager.upsert(Order.get_dbname(), idSq, orderBody, {
		user: AuthHelper.getSystemUser(),
	})) as any;
	const orderId = DBId.getObjectIdList([orderRes, idSq]).shift();

	/* ------------------------------- save items ------------------------------- */
	// if (orderProducts.length > 0) {
	// 	orderProducts.forEach((pr) => {
	// 		pr.order_id = orderId;
	// 	});
	// 	const itemBodies = await Promise.all(
	// 		orderProducts.map(async (r) => await r.get_deltaObject({ allProperties: true }))
	// 	);
	// 	const itemsRes = await DBManager.insert(OrderProduct.get_dbname(), {
	// 		__save_list: itemBodies,
	// 	});
	// }
	return orderRes;
}
export async function createOrder(order: Order) {
	const orderBody = await order.get_deltaObject({ allProperties: true });
	const orderProducts = order.get('items') as OrderProduct[];

	if (orderProducts.length === 0)
		return Error('[400] cant create order with no products');

	delete orderBody.items;
	/* ------------------------------- save order ------------------------------- */
	const orderRes = (await DBManager.insert(Order.get_dbname(), orderBody, {
		user: AuthHelper.getSystemUser(),
	})) as any;
	const orderId = DBId.get_id(orderRes);

	/* ------------------------------- save items ------------------------------- */
	if (orderProducts.length > 0) {
		orderProducts.forEach((pr) => {
			pr.order_id = orderId;
		});

		const itemBodies = await Promise.all(
			orderProducts.map(async (r) => await r.get_deltaObject({ allProperties: true }))
		);

		const itemsRes = await DBManager.insert(
			OrderProduct.get_dbname(),
			{
				__save_list: itemBodies,
			},
			{
				user: AuthHelper.getSystemUser(),               
			}
		);
		orderRes.products = itemsRes;
	}
	if (!Order.isResultValid(orderRes)) return { acknowledged: false };

	Logger.log_message('order', 'new order created successfully', Order.getID(orderRes));

	/* -------------------------------- send mail ------------------------------- */
	/**
	 * mail takes a long time to send. we dont want to use await here
	 * because user is waiting for thier order confirmation
	 */
	sendOrderMail(Order.getID(orderRes));

	return orderRes;
}
