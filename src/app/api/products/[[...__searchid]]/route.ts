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
	ServerApi.init();
	const rb = await RequestHelper.get_request_data([req, data]);
	if (rb['category']) {
		const all_cats = await Category.getCategoryWithSubs(rb['category']);
		rb['categories'] = { $in: all_cats.map((r) => DBId.getObjectId(r.getID())) };
		delete rb['category'];
	}
	return Response.json({
		data: await Product.get_list(rb),
	});
}
export async function POST(req: NextRequest, data: any) {
	DBManager.init();
	const [sq, insertbody] = await ObjectHelper.getRequestInsertObject(req, data, Product);
	const res = await DBManager.upsert(Product, sq, insertbody);
	return Response.json({ data: res });
}
