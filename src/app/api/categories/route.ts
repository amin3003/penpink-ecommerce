import {
	DBFiles,
	DBFilters,
	DBHelper,
	DBManager,
	ObjectHelper,
} from '@azrico/nodeserver';
import { Category } from '@codespase/core';
import { NextApiRequest } from 'next';

export async function GET() {
	const products = await DBManager.find('categories', {});
	return Response.json({ data: products });
}
export async function POST(req: Request) {
	const reqbody = await req.json();
	const insertbody = await ObjectHelper.prepareObject(reqbody, Category);
	const res = await DBManager.upsert(
		'categories',
		reqbody._id ? { _id: reqbody._id } : undefined,
		insertbody
	);
	return Response.json({ data: res });
}
