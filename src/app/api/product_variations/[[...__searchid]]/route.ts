import { DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { Category, Product, ProductVariation } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init(req);
	const sq = await RequestHelper.get_request_data([req, data]);
	const result = await ProductVariation.get_list(sq);
	return await RequestHelper.sendResponse(result);
}
