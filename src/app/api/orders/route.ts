import { DBManager } from '@azrico/nodeserver';

export async function GET() {
	const data = await DBManager.find('orders', {});
	return Response.json({ data: data });
}
