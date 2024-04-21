import { DBManager } from '@azrico/nodeserver';

export async function GET() {
	console.log('load prs');
	DBManager.init();
	const products = await DBManager.find('products', {});
	return Response.json({ data: products });
}
