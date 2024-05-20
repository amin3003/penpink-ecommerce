import { DBManager, ServerApi } from '@azrico/nodeserver';
import { Order } from '@codespase/core';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const search = decodeURIComponent(data.params.search ?? '');
	if (!search) {
		return Response.json({
			data: await Order.get_list({ __limit: 100, ...data.params }),
		});
	}
	return Response.json({ data: await Order.get_single(search) });
}
export async function POST(req: Request) {
	return Response.json({ data: 0 });
}
