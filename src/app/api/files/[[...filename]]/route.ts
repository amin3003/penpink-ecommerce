import { DBFiles, DBFilters, DBId, RequestHelper } from '@azrico/nodeserver';
 
import { NextRequest, NextResponse } from 'next/server';
import { array_first, object_isEmpty } from '@azrico/object';
import { sanitize_searchTextRegex } from '@azrico/string';

export async function DELETE(req: NextRequest, data: any) {
	const rb = await RequestHelper.get_request_data([req, data]);
	const fileid = DBId.getObjectId(rb) || DBId.getObjectId(rb.filename);

	if (!fileid) return await RequestHelper.sendResponse(new Error('[404] file not found'));

	const res = await DBFiles.delete(fileid);
	return await RequestHelper.sendResponse(res);
}
export async function GET(req: NextRequest, data: any) {
	const rb = await RequestHelper.get_request_data([req, data]);
	const sq: any = [];
	if (!rb.search && rb.filename) rb.search = rb.filename;

	if (!object_isEmpty(rb.filename)) {
		const fn = array_first(rb.filename);
		if (DBId.canBeObjectId(fn)) {
			sq.push({ _id: DBId.getObjectId(fn) });
		} else sq.push({ filename: sanitize_searchTextRegex(fn) });
	}
	if (rb.search) {
		if (DBId.canBeObjectId(rb.search)) {
			sq.push({ _id: DBId.getObjectId(rb.search) });
		} else sq.push({ filename: sanitize_searchTextRegex(array_first(rb.search)) });
	}
	/* -------------------------------------------------------------------------- */
	const fl = await DBFiles.find({ $and: sq, __limit: 100, __sort: { uploadDate: -1 } });

	return Response.json({ data: fl });
}
export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = array_first(
			formData.getAll('file') || formData.getAll('files')
		) as unknown as File;

		if (!file) {
			throw Error('no file found');
		}
		const uploadresult = await DBFiles.upload(file.name, file, {
			name: file.name,
			type: file.type,
			size: file.size,
		});
		return NextResponse.json({
			status: 'success',
			data: uploadresult,
			fileid: uploadresult,
		});
	} catch (ex) {
		return NextResponse.json({ error: String(ex) }, { status: 400 });
	}
}
export const dynamic = 'force-dynamic';
