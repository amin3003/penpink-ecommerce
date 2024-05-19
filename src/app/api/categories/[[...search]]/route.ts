import { DBId, DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';

export async function GET(props: any, data: any) {
	const search = decodeURIComponent(data.params.search);
	if (search) {
		return Response.json({
			data: await DBManager.find(Category.get_dbname(), {
				$or: [
					{ slug: search },
					DBId.canBeObjectId(search) ? { _id: DBId.getObjectId(search) } : {},
				],
			}),
		});
	} else {
		return Response.json({ data: await DBManager.find(Category.get_dbname(), {}) });
	}
}
export async function POST(req: Request, data: any) {
	const reqbody = await req.json();
	const insertbody = await ObjectHelper.prepareObject(reqbody, Category);

	const provided_id = reqbody._id ?? decodeURIComponent(data.params.search ?? '');
	const sq = DBManager.get_idSearchObject(provided_id, true);
	const res = await DBManager.upsert(Category.get_dbname(), sq, insertbody);
	return Response.json({ data: res });
}
