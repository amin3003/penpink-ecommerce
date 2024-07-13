import { DBId, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { Order, OrderProduct, Product } from '@codespase/core';
import { gfilter } from '@azrico/global';
import { NextRequest } from 'next/server';
import { saveOrder } from '../../orders/orderFunctions';

/**
 * user can submit their order tracking number here
 * we also check that the current user is the corect user!
 * @param req
 * @param data
 * @returns
 */
export async function POST(req: NextRequest, data: any) {
	ServerApi.init();
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Order, req, data);

	const searchId = DBId.getObjectId(sq);
	if (!insertbody.payment_code || !searchId || String(insertbody.payment_code).length < 3)
		return await RequestHelper.sendResponse(
			new Error('[400] bad payment code or order id')
		);

	/* ------------------------------ get the order ----------------------------- */
	const targetOrder = await Order.get_single({ _id: searchId });

	if (!targetOrder) {
		return await RequestHelper.sendResponse(
			new Error('[404] order not found or you dont have access to it')
		);
	}
	targetOrder.set('payment_code', insertbody.payment_code);
	const res = await saveOrder(targetOrder, false);
	if (Order.isResultValid(res)) {
		return await RequestHelper.sendResponse({
			acknowledged: true,
			payment_code: targetOrder.get('payment_code'),
		});
	}
	return await RequestHelper.sendResponse(
		new Error('[500] order save result was invalid')
	);
}
