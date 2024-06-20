import ConvertHelper from '@azrico/convert';
import {
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { object_isEmpty, wrap_array } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	DBManager.init();
	const sq = await RequestHelper.get_request_data([req, data]);
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

	const result = await Product.get_list(sq);
	return await RequestHelper.sendResponse(result);
}
export async function POST(req: NextRequest, data: any) {
	DBManager.init();
	const [sq, insertbody] = await ObjectHelper.getRequestInsertObject(req, data, Product);
	const res = await DBManager.upsert(Product, sq, insertbody);
	console.log('sq',sq, insertbody);

	return Response.json({ data: res });
}
