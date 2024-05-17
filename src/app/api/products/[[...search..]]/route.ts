import { DBId, DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const search = decodeURIComponent(data.params.search);

	if (!search) {
		return Response.json({
			data: await DBManager.find('products', { __limit: 100, ...data.params }),
		});
	}
	const pr = Product.get_single(search);
	return Response.json({ data: pr });
}
export async function POST(req: Request, data: any) {
	const reqbody = await req.json();

	const insertbody = await ObjectHelper.prepareObject(reqbody, Product);

	const searchid = reqbody._id ?? decodeURIComponent(data.params.search);
	const sq = searchid ? DBManager.get_idSearchObject(searchid) : undefined;

	const res = await DBManager.upsert(Product.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
