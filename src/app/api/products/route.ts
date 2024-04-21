import { DBManager } from '@azrico/nodeserver';

export async function GET() {
	const data = await DBManager.find('products', {});
	return Response.json({ data: data });
}