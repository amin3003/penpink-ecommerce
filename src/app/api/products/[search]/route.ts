import { DBId, DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const search = data.params.search;
	const pr = await Product.get_single({
		$or: [{ _id: DBId.get_id_object(search) }, { slug: search }],
	});
	console.log('getpr:', search, pr);
	return Response.json({ data: pr });
}
