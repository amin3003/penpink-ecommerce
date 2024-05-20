import {
	DBId,
	DBManager,
	ObjectHelper,
	PackageHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const search = decodeURIComponent(data.params.search ?? '');
	if (!search) {
		return Response.json({
			data: await DBManager.find('products', { __limit: 100, ...data.params }),
		});
	}
	return Response.json({
		data: await DBManager.first('products', data.params),
	});
}
export async function POST(req: Request, data: any) {
	const reqbody = await req.json();
	const insertbody = await ObjectHelper.prepareObject(reqbody, Product);

	const sq = DBManager.get_idSearchObject(
		reqbody._id ?? decodeURIComponent(data.params.search ?? ''),
		true
	);
	const res = await DBManager.upsert(Product.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
