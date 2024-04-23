import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const imageid = data.params._id;
	const pr = array_first(await DBManager.find('products', { _id: imageid }));
	return Response.json({ data: pr });
}
