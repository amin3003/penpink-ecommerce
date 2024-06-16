import { DBId, DBManager, RequestHelper } from '@azrico/nodeserver';
import { array_makeMap } from '@azrico/object';
import {
	BasketItem,
	Order,
	OrderProduct,
	Product,
	SimpleUserPreference,
} from '@codespase/core';
import { NextRequest } from 'next/server';
import uid from '@azrico/uid';

/**
 * posting to this route will verify your basket and create an Order from it
 * @param req
 */
export async function POST(req: NextRequest) {
	DBManager.init();
	const uid = req.headers.get('x-uid');
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const basketItems = await BasketItem.get_list(uid);
	let userAddress = (await SimpleUserPreference.getPreference(uid, 'address'))?.value;
	try {
		if (typeof userAddress === 'string') userAddress = JSON.parse(userAddress);
	} catch {}
	/* --------------------------------- checks --------------------------------- */
	if (!userAddress || typeof userAddress === 'string')
		return await RequestHelper.sendResponse(Error('ادرس اشتباه'));
	if (basketItems.length === 0)
		return await RequestHelper.sendResponse(Error('سبد خرید شما خالی است'));

	const productsInBasket = array_makeMap(await Product.get_list(basketItems), '_id');

	const orderProducts = basketItems
		.map((r) => {
			if (!r.product_id) return undefined;
			r.__product = productsInBasket[r.product_id];
			return new OrderProduct(r);
		})
		.filter((s) => s);

	//create order for this basket
	const order = new Order({});
	await order.set('address', userAddress);
	await order.set('items', orderProducts);
	await order.set('status', 'pending');
	const insertResult = await createOrder(order);
	if (!DBId.canBeObjectId(insertResult)) {
		return await RequestHelper.sendResponse(Error('cant verify the basket'));
	}

	/* ---------------------------- clear the basket ---------------------------- */
	const delres = await DBManager.delete(
		'basket',
		{
			userid: uid,
		},
		true
	);
	console.log('delres', delres);
	return await RequestHelper.sendResponse({ _id: insertResult }, 'ok');
}
async function createOrder(order: Order) {
	const orderBody = await order.get_deltaObject({ allProperties: true });
	const orderProducts = order.get('items') as OrderProduct[];
	delete orderBody.items;
	/* ------------------------------- save order ------------------------------- */
	const orderRes = (await DBManager.insert(Order.get_dbname(), orderBody)) as any;
	const orderId = DBId.get_id(orderRes);

	/* ------------------------------- save items ------------------------------- */
	orderProducts.forEach((pr) => {
		pr.order_id = orderId;
	});
	const itemBodies = await Promise.all(
		orderProducts.map(async (r) => await r.get_deltaObject({ allProperties: true }))
	);

	const itemsRes = await DBManager.insert(OrderProduct.get_dbname(), {
		__save_list: itemBodies,
	});
	//TODO verify itemRes
	return orderId;
}
