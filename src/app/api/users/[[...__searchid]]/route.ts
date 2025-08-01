import { RequestHelper, ServerApi } from '@azrico/nodeserver';
import { SimpleUser } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();
	const sq = await RequestHelper.get_request_data([req, data]);
	const result = await SimpleUser.get_list(sq);
	return await RequestHelper.sendResponse(result);
}
export const dynamic = 'force-dynamic';
