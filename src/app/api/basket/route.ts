import { DBId, DBManager, ServerApi } from '@azrico/nodeserver';
import { BasketItem, Category } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	ServerApi.init();
	const uid = req.cookies.get('uid')?.value;
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const data = await BasketItem.get_list(uid);

	console.log(data);
	return Response.json({ data: data });
}
export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const product_id = reqbody.id ?? reqbody.product_id;
	const variation_code = reqbody.code ?? reqbody.variation_code;

	if (!variation_code || !product_id)
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
			variation_code: variation_code,
		},
		update_query,
		{
			history: false,
			user: 'system',
		}
	);
	return Response.json({ data: res });
}
export const dynamic = 'force-dynamic';