import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_makeMap } from '@azrico/object';
import {
	BasketItem,
	Order,
	OrderProduct,
	Product,
	ProductVariation,
	SimpleUserPreference,
} from '@codespase/core';
import { NextRequest } from 'next/server';
import { createOrder } from '../../orders/orderFunctions';

/**
 * posting to this route will verify your basket and create an Order from it
 * @param req
 */
export async function POST(req: NextRequest) {
	ServerApi.init();

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

	const orderProducts = basketItems
		.map((r) => {
			if (!r.getProductId()) return undefined;
			return new OrderProduct(r);
		})
		.filter((s) => s);

	//create order for this basket
	const order = new Order({});
	await order.set('address', userAddress);
	await order.set('items', orderProducts);
	await order.set('status', 'pending');
	const orderRes = await createOrder(order);

	if (!DBId.canBeObjectId(DBId.get_id(orderRes))) {
		return await RequestHelper.sendResponse(Error('cant verify the basket'));
	}

	/* ---------------------------- clear the basket ---------------------------- */
	const delres = await DBManager.delete(
		'basket',
		{
			userid: uid,
		},
		{ multi: true }
	);
	return await RequestHelper.sendResponse(orderRes, 'ok');
}

export const dynamic = 'force-dynamic';
