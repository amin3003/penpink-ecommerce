import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const result = await DBManager.find('products', { ...data.params, __limit: 100 });
	return Response.json({ data: result });
}
export async function POST(req: Request) {
	return Response.json({ data: 0 });
}
