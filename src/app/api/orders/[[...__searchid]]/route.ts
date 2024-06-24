import { DBId, DBManager, DBOptions, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_first, object_isClass, object_isEmpty } from '@azrico/object';
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
	const sortingInfo = await DBOptions.getSortingInformation(searchQuery);
	const aggr: any[] = [{ $match: searchQuery }];
	if (!object_isEmpty(sortingInfo.sort))
		aggr.push({
			$sort: sortingInfo.sort,
		});
	aggr.push(
		...[
			{
				$limit: sortingInfo.limit_options.limit,
			},
			{
				$skip: sortingInfo.limit_options.skip,
			},
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
		]
	);
	let result = await DBManager.aggregate(Order, aggr);
	const orders = Order.mapto(Order, result, false);
	return await RequestHelper.sendResponse(isSingle ? array_first(orders) : orders);
}
