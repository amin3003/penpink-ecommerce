import ConvertHelper from '@azrico/convert';
import { DBId, DBManager, ObjectHelper, RequestHelper } from '@azrico/nodeserver';
import { object_isEmpty, wrap_array } from '@azrico/object';
import { Category, Product, ProductVariation } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	DBManager.init();
	const sq = await RequestHelper.get_request_data([req, data]);

	/**
	 * search for category and sub category
	 */
	if (sq['category']) {
		const all_cats = await Category.getCategoryWithSubs(sq['category']);
		sq['categories'] = { $in: all_cats.map((r) => DBId.getObjectId(r.getID())) };
		delete sq['category'];
	}
	if (sq['name'] || sq['search']) {
		sq['name'] = new RegExp(String(sq['name'] || sq['search']), 'i');
		delete sq.search;
	}

	/**
	 * check for variation search queries
	 * when searching for variations we use $and with $or because only 1 match per type is enough
	 * example: (brand=papco OR nahal) AND (color=red OR blue)
	 */
	const variationSearches = [];
	for (const key in sq) {
		if (!key.startsWith('v-')) continue;
		const rawkey = key.substring(2);
		variationSearches.push({
			['variations.variation_data.' + rawkey]: { $in: wrap_array(sq[key]) },
		});
		delete sq[key];
	}
	if (!object_isEmpty(variationSearches)) {
		if (!sq.$or) sq.$and = [];
		sq.$and.push(...variationSearches);
	}
	
	if (!sq['__sort']) sq['__sort'] = { _created_date: 1 };
	const result = await Product.get_list(sq);
	
	console.log('sq', sq, result); 
	
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

	if (variations) {
		const product_id = DBId.get_id_list([sq, res]).find((s) => s != null);
		//save the variations

		DBManager.extra_logs = true;
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
