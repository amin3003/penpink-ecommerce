import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Category } from '@codespase/core';

export async function GET(req: Request, data: any) {
	console.log('get singleproduct', data);
	const search = data.params.search;
	const pr = array_first(await DBManager.find('products', { _id: search }));
	return Response.json({ data: pr });
}
