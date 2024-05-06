import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';

export async function GET() {
	const data = await DBManager.find(Category.get_dbname(), {}); 
	return Response.json({ data: data });
}
export async function POST(req: Request) {
	const reqbody = await req.json();
	const insertbody = await ObjectHelper.prepareObject(reqbody, Category);
	const res = await DBManager.upsert(
		Category.get_dbname(),
		reqbody._id ? { _id: reqbody._id } : undefined,
		insertbody
	);
	return Response.json({ data: res });
}
