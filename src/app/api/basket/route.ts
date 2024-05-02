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
	const uid = req.cookies.get('uid');
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	const reqbody = await req.json();
	console.log(reqbody);
	const data = await DBManager.find('basket', { userid: uid });
	return Response.json({ data: [] });
}
