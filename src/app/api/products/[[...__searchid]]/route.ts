import ConvertHelper from '@azrico/convert';
import {
	DBFiles,
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
} from '@azrico/nodeserver';
import { object_clean, object_isEmpty, wrap_array } from '@azrico/object';
import { Category, Product, ProductVariation } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function loadProductSearchQuery(sq: any) {
	const resultSq: any = { $and: [] };
	/**
	 * search for category and sub category
	 */
	if (sq['category']) {
		const all_cats = await Category.getCategoryWithSubs(sq['category']);
		resultSq.$and.push({
			categories: { $in: all_cats.map((r) => DBId.getObjectId(r.getID())) },
		});
		delete sq['category'];
	}
	if (sq['name'] || sq['search']) {
		resultSq.$and.push({
			name: new RegExp(String(sq['name'] || sq['search'] || ''), 'i'),
		});
		delete sq['name'];
		delete sq['search'];
	}
	/* -------------------------------------------------------------------------- */
	/*                     check for variation search queries                     */
	/* -------------------------------------------------------------------------- */
	const variationSearches: any[] = [];
	for (const key in sq) {
		if (!key.startsWith('v-')) continue;
		const rawkey = key.substring(2);
		/**
		 * check for variation search queries
		 * when searching for variations we use $and with $or because only 1 match per type is enough
		 * example: (brand=papco OR nahal) AND (color=red OR blue)
		 */
		variationSearches.push({
			$or: wrap_array(sq[key]).map((value) => {
				return {
					['variation_data.' + rawkey]: new RegExp(value, 'gi'),
				};
			}),
		});
		delete sq[key];
	}
	if (!object_isEmpty(variationSearches)) {
		const variationSq = { $and: variationSearches };
		const resultVariations = await DBManager.aggregate(ProductVariation, [
			{ $match: variationSq },
			{ $group: { _id: '$product_id' } },
		]);
		resultSq.$and.push({
			_id: { $in: resultVariations.map((r) => DBId.getObjectId(r._id)) },
		});
	}

	/* --------------------------- add remaining keys --------------------------- */
	for (const key in sq) {
		if (key in resultSq) continue;
		resultSq[key] = sq[key];
	}

	/* -------------------------------- finalize -------------------------------- */
	if (!resultSq['__sort']) resultSq['__sort'] = { _created_date: 1 };

	return DBFilters.prepareSearch(object_clean(resultSq));
}
export async function GET(req: NextRequest, data: any) {
	DBManager.init();
	let sq = await RequestHelper.get_request_data([req, data]);

	sq = await loadProductSearchQuery(sq);

	let result = await DBManager.aggregate(Product, [
		{ $match: sq },
		{
			$lookup: {
				from: 'product_variations',
				localField: '_id',
				foreignField: 'product_id',
				as: 'variations',
			},
		},
	]);
	result = Product.mapto(Product, result, false);
	return await RequestHelper.sendResponse(result);
}

export async function POST(req: NextRequest, data: any) {
	DBManager.init();
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, req, data);

	//variations are saved seperately
	const variations = insertbody.variations;
	delete insertbody.variations;

	//save the product
	const res = await DBManager.upsert(Product, sq, insertbody);

	console.log(res, variations);
	if (variations) {
		const product_id = DBId.get_id_list([sq, res]).find((s) => s != null);
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
