import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const search = data.params.search;
	const pr = array_first(
		await DBManager.find('products', { $or: [{ _id: search }, { slug: search }] })
	);
	return Response.json({ data: pr });
}
