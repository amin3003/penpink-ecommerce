import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const uid = req.cookies.get('uid');
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const data = await DBManager.find('basket', { userid: uid });
	return Response.json({ data: data });
}
export async function POST(req: NextRequest) {
	const uid = req.headers.get('x-uid');
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const old_basket = (await DBManager.first('basket', { userid: uid })) || {};
	let items_map = old_basket.items;
	if (typeof items_map != 'object' || !items_map) items_map = {};

	const variation_code = reqbody.code ?? reqbody.variation_code;
	const old_item = items_map[variation_code] || { quantity: 0 };

	if (reqbody.add) old_item.quantity = Number(old_item.quantity) + Number(reqbody.add);
	if (reqbody.quantity) old_item.quantity = Number(old_item.quantity);
	items_map[variation_code] = old_item;

	const res = await DBManager.upsert(
		'basket',
		{ userid: uid },
		{ items: items_map },
		{ history: false }
	);
	return Response.json({ data: res });
}
