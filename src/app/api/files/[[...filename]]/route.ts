import { DBFiles, DBFilters, DBId, RequestHelper } from '@azrico/nodeserver';

import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { array_first, object_isEmpty } from '@azrico/object';
export async function GET(req: NextRequest, data: any) {
	const rb = await RequestHelper.get_request_data([req, data]);
	const sq: any = [];
	if (!object_isEmpty(rb.filename)) {
		const fn = array_first(rb.filename);
		if (DBId.canBeObjectId(fn)) {
			sq.push({ _id: DBId.getObjectId(fn) });
		} else sq.push({ filename: fn });
	}
	if (rb.search) {
		sq.push({ filename: DBFilters.sanitizeSearchTextRegex(array_first(rb.search)) });
	}
	/* -------------------------------------------------------------------------- */
	const fl = await DBFiles.find({ $and: sq });
	return Response.json({ data: fl });
}
export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = array_first(
			formData.getAll('file') || formData.getAll('files')
		) as unknown as File;

		console.log(formData);
		console.log(file);
		if (!file) {
			throw Error('no file found');
		}
		const uploadresult = await DBFiles.upload(file.name, file);
		return NextResponse.json({
			status: 'success',
			data: uploadresult,
			fileid: uploadresult,
		});
	} catch (ex) {
		console.log(ex);
		return NextResponse.json({ error: String(ex) }, { status: 400 });
	}
}
