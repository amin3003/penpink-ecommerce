import ConvertHelper from '@azrico/convert';
import {
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
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
	const result = await Product.get_list(sq);
	return await RequestHelper.sendResponse(result);
}
export async function POST(req: NextRequest, data: any) {
	DBManager.init();
	const [sq, insertbody] = await ObjectHelper.getRequestInsertObject(req, data, Product);
	const res = await DBManager.upsert(Product, sq, insertbody);
	return Response.json({ data: res });
}
