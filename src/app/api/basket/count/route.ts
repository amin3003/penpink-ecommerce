import { DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { BasketItem } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	ServerApi.init();
	const uid = req.cookies.get('x-uid')?.value;
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const data = await DBManager.count(BasketItem, { userid: uid, quantity: { $gt: 0 } });
	return await RequestHelper.sendResponse(data);
}

export const dynamic = 'force-dynamic';
