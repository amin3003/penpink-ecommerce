import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	PackageHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_clean, array_first, object_merge } from '@azrico/object';
import { Category, Product } from '@codespase/core';
import { ObjectId } from 'mongodb';
import { useSearchParams } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, data: any) {
	ServerApi.init();

	const rb = await RequestHelper.get_request_data([req, data]);
	return Response.json({
		data: await Product.get_list(rb),
	});
}
export async function POST(req: NextRequest, data: any) {
	const [sq, insertbody] = await RequestHelper.getRequestInsertObject(req, data, Product);
	const res = await DBManager.upsert(Product, sq, insertbody);
	return Response.json({ data: res });
}
