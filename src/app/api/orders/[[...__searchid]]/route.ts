import {
	DBId,
	DBManager,
	DBOptions,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_first, object_isClass, object_isEmpty } from '@azrico/object';
import { string_isEmpty } from '@azrico/string';
import { Order, OrderProduct, Product } from '@codespase/core';
import { gfilter } from '@azrico/global';
import { NextRequest } from 'next/server';
import { createOrder, saveOrder } from '../orderFunctions';
export async function POST(req: NextRequest, data: any) {
	ServerApi.init();
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Order, req, data);
	const res = await saveOrder(new Order({ ...sq, ...insertbody }));
	return await RequestHelper.sendResponse(res);
}
export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);
	const isSingle = !string_isEmpty(decodeURIComponent(data.params.search ?? ''));
	/* ----------------------------- get the orders ----------------------------- */
	let searchQuery: any = {};
	const searchId = DBId.getIdSearchObject(rd);
	if (searchId) {
		searchQuery = searchId;
	} else {
		if (rd['search']) {
			const s = rd['search'];
			searchQuery.$or = [
				{ 'address.name': new RegExp(s, 'i') },
				{ 'address.lastname': new RegExp(s, 'i') },
				{ 'address.address': new RegExp(s, 'i') },
			];
		}
		if (rd['status']) {
			const s = rd['status'];
			searchQuery.status = new RegExp(s, 'i');
		}
	}

	/* -------------------------------------------------------------------------- */
	const sortingInfo = await DBOptions.getSortingInformation(searchQuery);
	const aggr: any[] = [{ $match: searchQuery }];
	if (!object_isEmpty(sortingInfo.sort))
		aggr.push({
			$sort: sortingInfo.sort,
		});
	else
		aggr.push({
			$sort: { _created_date: -1 },
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
			{
				$lookup: {
					from: 'product_variations',
					let: { product_ids: '$items.product_id' },
					pipeline: [{ $match: { $expr: { $in: ['$product_id', '$$product_ids'] } } }],
					as: 'product_variations',
				},
			},
		]
	);
	let result = await DBManager.aggregate(Order, aggr);
	const orders = Order.mapto(Order, result, false);

	return await RequestHelper.sendResponse(isSingle ? array_first(orders) : orders);
}
export const dynamic = 'force-dynamic';
