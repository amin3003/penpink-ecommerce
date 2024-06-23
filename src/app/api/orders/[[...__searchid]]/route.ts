import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { string_isEmpty } from '@azrico/string';
import { Order, OrderProduct, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	DBManager.init();
	const search = decodeURIComponent(data.params.search ?? '');
	const isSingle = !string_isEmpty(search);
	/* ----------------------------- get the orders ----------------------------- */
	let searchQuery = {};
	if (isSingle) {
		searchQuery = DBId.getIdSearchObject(search);
	} else searchQuery = data.params;

	let result = await DBManager.aggregate(Order, [
		{ $match: searchQuery },
		{
			$lookup: {
				from: 'order_products',
				localField: '_id',
				foreignField: 'order_id',
				as: 'items',
			},
		},
		{
			$lookup: {
				from: 'products',
				let: { product_ids: '$items.product_id' },
				pipeline: [{ $match: { $expr: { $in: ['$_id', '$$product_ids'] } } }],
				as: 'products',
			},
		},
	]);
	const orders = Order.mapto(Order, result, false);
	return await RequestHelper.sendResponse(isSingle ? array_first(orders) : orders);
}
