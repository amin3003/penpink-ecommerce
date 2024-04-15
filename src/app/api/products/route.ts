import { DBManager } from '@azrico/nodeserver';

export async function GET() {
	const products = await DBManager.find('products', {});
	return Response.json({ data: products });
}
