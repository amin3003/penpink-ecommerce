import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { BasketItem, Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	// ServerApi.init();
	// ServerApi.show_logs = true;
	console.log('get basket count');
	return await RequestHelper.sendResponse({});

	const uid = req.cookies.get('x-uid')?.value;
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const data = await BasketItem.get_list(uid);

	return await RequestHelper.sendResponse(data);
}
