import { DBManager, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_makeMap, object_merge } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const rb = await RequestHelper.get_request_data([req, data]);
	const categoryList = await Category.get_list(rb);

	/* ----------------------- count products per category ---------------------- */
	const categoryCounts = await DBManager.aggregate(Product.get_dbname(), [
		{
			$project: {
				categories: true,
			},
		},
		{
			$unwind: '$categories',
		},
		{
			$group: {
				_id: '$categories',
				total: {
					$sum: 1,
				},
			},
		},
	]);
	await Category.loadCounts(categoryList, categoryCounts as any);

	
	return RequestHelper.sendResponse(categoryList);
}
export async function POST(req: Request, data: any) {
	const [sq, insertbody] = await ObjectHelper.getRequestInsertObject(req, data, Category);
	const res = await DBManager.upsert(Category.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
