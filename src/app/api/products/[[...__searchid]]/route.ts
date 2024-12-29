import {
	DBId,
	DBManager,
	DBOptions,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { object_isEmpty, wrap_array } from '@azrico/object';
import { Product, ProductVariation } from '@codespase/core';
import { NextRequest } from 'next/server';
import { loadProductSearchQuery } from '../loadProductSearchQuery';
import { deleteProduct } from '../deleteProduct';
import { saveProduct } from '../saveProduct';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);
	const sortingInfo = await DBOptions.getSortingInformation(rd);
	const sq = await loadProductSearchQuery(rd);
	const aggr: any[] = [
		{ $match: sq },

		{
			$lookup: {
				from: 'product_variations',
				localField: '_id',
				foreignField: 'product_id',
				as: 'variations',
			},
		},
	];
	if (!object_isEmpty(sortingInfo.sort)) {
		aggr.push({
			$sort: sortingInfo.sort,
		});
	} else {
		aggr.push({ $sort: { _created_date: -1 } });
	}
	if (!object_isEmpty(sortingInfo.limit_options))
		aggr.push(
			...[
				{
					$limit: sortingInfo.limit_options.limit,
				},
				{
					$skip: sortingInfo.limit_options.skip,
				},
			]
		);

	let result = await DBManager.aggregate(Product, aggr);
	console.log(aggr, result);
	result = Product.mapto(Product, result, false);
	return await RequestHelper.sendResponse(result);
}

export async function POST(req: NextRequest, data: any) {
	ServerApi.init();

	return await RequestHelper.sendResponse(await saveProduct(req, data));
}
export async function DELETE(req: NextRequest, data: any) {
	ServerApi.init();
	return await RequestHelper.sendResponse(await deleteProduct(req, data));
}
