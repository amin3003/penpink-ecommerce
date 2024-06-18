import {
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_makeMap, object_merge } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	DBManager.init();
	const rb = await RequestHelper.get_request_data([req, data]);
	const categoryList = await Category.get_list(rb);
	// await load_counts(categoryList);
	return RequestHelper.sendResponse(categoryList);
}
export async function POST(req: Request, data: any) {
	const [sq, insertbody] = await ObjectHelper.getRequestInsertObject(req, data, Category);
	const res = await DBManager.upsert(Category.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}

async function load_counts(categoryList: Category[]) {
	const categoryIdList = categoryList.map((r) => DBId.getObjectId(r.getID()));
	const subidlist = await DBManager.aggregate(Category.get_dbname(), [
		{ $match: DBId.getIdSearchObject(categoryIdList) },
		{
			$graphLookup: {
				from: 'categories',
				startWith: '$_id',
				connectFromField: '_id',
				connectToField: 'parent_id',
				as: 'subs',
			},
		},
		{
			$project: {
				_id: 1,
				name: 1,
				subs: {
					_id: 1,
				},
			},
		},
		{
			$set: {
				subs: '$subs._id',
			},
		},
	]);
	/* ----------------------- count products per category ---------------------- */
	const categoryCounts = await DBManager.aggregate(Product.get_dbname(), [
		{
			$match: {
				categories: { $in: categoryIdList },
			},
		},
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

	console.log('categoryIdList', categoryIdList);
	console.log('categoryCounts', categoryCounts);
	for (const cat of categoryList) {
		const catid = cat.getID() as any;
		const subs = subidlist.find((s) => s._id == catid)?.subs ?? [];

		cat._self_product_count = categoryCounts[catid]?.total ?? 0;
		let currentCount = 0;
		for (const subcatid of subs) {
			currentCount += categoryCounts[subcatid]?.total ?? 0;
		}
		console.log('_self_product_count', cat._self_product_count);
		console.log('currentCount', currentCount);
	}
}
