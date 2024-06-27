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
		]
	);
	let result = await DBManager.aggregate(Product, aggr);
	result = Product.mapto(Product, result, false);
	return await RequestHelper.sendResponse(result);
}

export async function POST(req: NextRequest, data: any) {
	ServerApi.init();
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, req, data);

	//variations are saved seperately
	const variations = insertbody.variations;
	delete insertbody.variations;

	//save the product
	const res = await DBManager.upsert(Product, sq, insertbody);

	if (variations) {
		const product_id = DBId.get_id_list([sq, res]).shift();
		//save the variations
		const var_res = await Promise.all(
			variations.map(async (variationData) => {
				variationData.product_id = product_id;
				const [sq, insertbody] = await ObjectHelper.getSqBodyPair(
					ProductVariation,
					variationData
				);
				return await DBManager.upsert(ProductVariation, sq, insertbody);
			})
		);
		const variationSaveError = wrap_array(var_res).find((s) => s instanceof Error);
		if (variationSaveError) {
			return await RequestHelper.sendResponse(variationSaveError);
		}
	}
	return await RequestHelper.sendResponse(res);
}
