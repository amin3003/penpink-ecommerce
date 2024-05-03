import { DBManager, ObjectHelper, PackageHelper } from '@azrico/nodeserver';
import { Category } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const uid = req.cookies.get('uid')?.value;
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const data = await DBManager.find('basket', { userid: uid });
	return Response.json({ data: data });
}
export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();

	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });

	const variation_code = reqbody.code ?? reqbody.variation_code;
	const upd_op = reqbody.add ? '$inc' : '$set';
	const upd_val = reqbody.add ?? reqbody.quantity;
	const update_query = {
		[upd_op]: { [`items.${variation_code}.quantity`]: upd_val },
	};
	const res = await DBManager.upsert('basket', { userid: uid }, update_query, {
		history: false,
	});
	// console.log('post to basket!', update_query, res);
	return Response.json({ data: res });
}
