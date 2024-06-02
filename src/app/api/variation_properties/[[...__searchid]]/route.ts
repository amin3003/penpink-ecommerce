import {
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { object_merge } from '@azrico/object';
import { Order, VariationProperty } from '@codespase/core';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const rb = await RequestHelper.get_request_data([req, data]);
	console.log(rb, data.params);
	return Response.json({
		data: await VariationProperty.get_list(rb),
	});
}
export async function POST(req: Request, data: any) {
	const [sq, insertbody] = await RequestHelper.getRequestInsertObject(
		req,
		data,
		VariationProperty
	);
	const res = await DBManager.upsert(VariationProperty, sq, insertbody);
	return Response.json({ data: res });
}
