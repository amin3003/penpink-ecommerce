import { ServerApi } from '@azrico/nodeserver';
import { Category, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	const result = await Product.get_list({ ...data.params, __limit: 100 });
	return Response.json({ data: result });
}
export async function POST(req: Request) {
	return Response.json({ data: 0 });
}
