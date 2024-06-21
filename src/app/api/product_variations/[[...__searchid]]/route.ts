import ConvertHelper from '@azrico/convert';
import { DBManager, RequestHelper } from '@azrico/nodeserver';
import { array_makeArrayMap, object_isEmpty, wrap_array } from '@azrico/object';
import { Category, Product, ProductVariation } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	DBManager.init();
	const sq = await RequestHelper.get_request_data([req, data]);
	const result = await ProductVariation.get_list(sq);
	return await RequestHelper.sendResponse(result);
}
