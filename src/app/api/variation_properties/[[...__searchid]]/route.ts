import {
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { Order, VariationProperty } from '@codespase/core';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const rb = await RequestHelper.get_request_data([req, data]);
	const res = await VariationProperty.get_list(rb);
	return await RequestHelper.sendResponse(res);
}
export async function POST(req: Request, data: any) {
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(VariationProperty, req, data);
	const res = await DBManager.upsert(VariationProperty, sq, insertbody);
	return Response.json({ data: res });
}
