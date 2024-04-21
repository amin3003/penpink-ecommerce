import { DBManager } from '@azrico/nodeserver';

export async function GET() {
	await DBManager.init();
	const data = await DBManager.find('products', {});
	return Response.json({ data: data });
}