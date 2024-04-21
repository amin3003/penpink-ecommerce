import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';

export async function GET() {
	const data = await DBManager.find('products', {});
	return Response.json({ data: data });
}
export async function POST(req: Request) {
	return Response.json({ data: 0 });
}
