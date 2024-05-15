import { DBFiles, DBFilters } from '@azrico/nodeserver';

import fs from 'fs';
import { NextResponse } from 'next/server';
import { array_first } from '@azrico/object';
export async function GET(req: Request, data: any) {
	const url = new URL(req.url);
	const filename = url.searchParams.get('filename');
	const sq = { $and: [{ filename: RegExp('.*\\.(jpg|png)') }] };
	if (filename) sq.$and.push({ filename: DBFilters.sanitizeSearchTextRegex(filename) });
	/* -------------------------------------------------------------------------- */
	const fl = await DBFiles.find(sq);
	return Response.json({ data: fl });
}
export async function POST(req: Request) {
	try {
		//TODO PARSE files uploaded from AzFetch
		const formData = await req.formData();
		const file = array_first(
			formData.getAll('file') || formData.getAll('files')
		) as unknown as File;

		if (!file) {
			throw Error('no file found ');
		} 
		const uploadresult = await DBFiles.upload(file.name, file);
		return NextResponse.json({
			status: 'success',
			data: uploadresult,
			fileid: uploadresult,
		});
	} catch (ex) {
		return NextResponse.json({ error: String(ex) }, { status: 400 });
	}
}
