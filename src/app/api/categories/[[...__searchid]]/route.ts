import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	PackageHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { object_merge } from '@azrico/object';
import { Category } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const rb = await RequestHelper.get_request_data([req, data]);

	return Response.json({
		data: await Category.get_list(rb),
	});
}
export async function POST(req: Request, data: any) {
	const rb = object_merge(await req.json(), data.params);
	const sq = DBId.getIdSearchObject(rb);
	const insertbody = await ObjectHelper.prepareObject(rb, Category);

	const res = await DBManager.upsert(Category.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
