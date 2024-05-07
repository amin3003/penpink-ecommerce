import { DBId, DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const search = data.params.search;
	const pr = Product.get_single(search);
	return Response.json({ data: pr });
}
export async function POST(req: Request, data: any) {
	const reqbody = await req.json();
	const search = data.params.search;

	const use_id = DBId.get_id_object(reqbody._id ?? search);
	const insertbody = await ObjectHelper.prepareObject(reqbody, Product);

	console.log(reqbody, insertbody);
	const res = await DBManager.upsert(
		Product.get_dbname(),
		use_id ? { _id: use_id } : undefined,
		insertbody
	);
	return Response.json({ data: res });
}