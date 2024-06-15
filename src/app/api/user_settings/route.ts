import { DBId, DBManager, ServerApi, RequestHelper } from '@azrico/nodeserver';
import { BasketItem, Category, SimpleUserPreference } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	ServerApi.init();
	const uid = req.cookies.get('uid')?.value;
	const reqbody = await RequestHelper.get_request_data(req);
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const res = await DBManager.first(SimpleUserPreference.get_dbname(), {
		userid: uid,
		key: reqbody.key,
	});
	return await RequestHelper.sendResponse(res);
}
export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const key = reqbody.key;
	const value = reqbody.value;
	const res = await DBManager.upsert(
		SimpleUserPreference.get_dbname(),
		{
			userid: uid,
			key: key,
		},
		{ value: value },
		{
			history: false,
			user: 'system',
		}
	);
	return await RequestHelper.sendResponse(res);
}
export const dynamic = 'force-dynamic';
