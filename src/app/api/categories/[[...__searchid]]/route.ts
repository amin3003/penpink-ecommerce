import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import {
	array_makeMap,
	array_remove_duplicates,
	object_isTrue,
	object_merge,
} from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);

	const searchQuery: any = {};
	const idSearch = DBId.getIdSearchObject(rd);
	if (idSearch) {
		Object.assign(searchQuery, idSearch);
	} else {
		if (rd['pinned']) {
			searchQuery['pinned'] = object_isTrue(rd['pinned']);
		}
		const search = DBFilters.get_search(rd);
		if (search) {
			searchQuery.$or = [
				{ name: new RegExp(search, 'i') },
				{ slug: new RegExp(search, 'i') },
			];
		}
	}

	const categoryList = await Category.get_list(searchQuery);

	await load_counts(categoryList);
	return RequestHelper.sendResponse(categoryList);
}
export async function POST(req: Request, data: any) {
	ServerApi.init();

	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Category, req, data);
	const res = await DBManager.upsert(Category.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}

async function load_counts(categoryList: Category[]) {
	const categoryIdList = categoryList.map((r) => DBId.getObjectId(r.getID()));

	if (categoryIdList.length === 0) return;
	const subcatList = await DBManager.aggregate(Category.get_dbname(), [
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
	const catTotals = await DBManager.aggregate(Product.get_dbname(), [
		// {
		// 	$match: {
		// 		categories: {
		// 			$in: array_remove_duplicates([
		// 				...subcatList.map((r) => r._id),
		// 				...categoryIdList,
		// 			]).map((r) => DBId.getObjectId(r)),
		// 		},
		// 	},
		// },
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
	const catTotalsMap = array_makeMap(catTotals, '_id');
	for (const cat of categoryList) {
		const catid = cat.getID() as any;
		cat._self_product_count = catTotalsMap[String(catid)]?.total ?? 0;

		//check subs
		const subCatIdList = (
			subcatList.find((s) => String(s._id) == String(catid))?.subs ?? []
		).map((r: any) => String(r)) as any[];
		let subCount = 0;
		for (const subcatid of subCatIdList) {
			subCount += catTotalsMap[String(subcatid)]?.total ?? 0;
		}
		cat._total_product_count = cat._self_product_count + subCount;
	}
}
export const dynamic = 'force-dynamic';
