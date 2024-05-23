import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	PackageHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_clean, array_first, object_merge } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { ObjectId } from 'mongodb';
import { useSearchParams } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const sq = DBFilters.prepareSearch([req, data]);

	return Response.json({
		data: await Product.get_list(sq),
	});
	//TODO fix
	console.log(sq);
	if (sq.search) {
		return Response.json({
			data: await DBManager.first('products', {
				$or: array_clean([{ slug: sq.search }, DBId.get_idSearchObject(sq.search)]),
			}),
		});
	}
	return Response.json({
		data: await DBManager.find('products', { __limit: 100, ...sq }),
	});
}
export async function POST(req: NextRequest, data: any) {
	const rb = object_merge(await req.json(), data.params);
	const sq = DBId.getIdSearchObject(rb);
	console.log('rb:', rb);
	console.log('sq:', sq);

	const insertbody = await ObjectHelper.prepareObject(rb, Product);

	const res = await DBManager.upsert(Product.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
