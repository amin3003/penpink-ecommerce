import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { BasketItem, Category, Product } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	// ServerApi.init();
	// ServerApi.show_logs = true;
	console.log('get basket done');
	return await RequestHelper.sendResponse({});

	const uid = req.cookies.get('x-uid')?.value;
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const data = await BasketItem.get_list(uid);

	return await RequestHelper.sendResponse(data);
}
export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const product_id = reqbody.id ?? reqbody.product_id;
	const variation_id = reqbody.code ?? reqbody.variation_id;

	if (!variation_id || !product_id)
		return Response.json({ error: 'product not found' }, { status: 404 });

	let upd_op = '$inc';
	let upd_val = 0;
	switch (reqbody.quantity) {
		case 'delete':
			upd_op = '$set';
			upd_val = 0;
			break;
		case 'decrease':
		case 'remove':
			upd_op = '$inc';
			upd_val = -1;
			break;
		case 'increase':
		case 'add':
		default:
			upd_op = '$inc';
			upd_val = 1;
			break;
	}

	const update_query = {
		[upd_op]: { [`quantity`]: upd_val },
	};

	//
	const res = await DBManager.upsert(
		'basket',
		{
			userid: uid,
			product_id: DBId.getObjectId(product_id),
			variation_id: DBId.getObjectId(variation_id),
		},
		update_query,
		{
			history: false,
			user: 'system',
		}
	);
	return await RequestHelper.sendResponse(res);
}
export const dynamic = 'force-dynamic';
