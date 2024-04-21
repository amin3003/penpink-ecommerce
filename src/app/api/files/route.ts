import { DBFiles } from '@azrico/nodeserver';

import fs from 'fs';
import { NextResponse } from 'next/server';
import { array_first } from '@azrico/object';

export async function GET(req: Request) {
	const fl = await DBFiles.find({});
	return Response.json({ data: fl.length });
}
export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = array_first(formData.getAll('file')) as unknown as File;

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
		return NextResponse.json({ error: String(ex) }, { status: 400 });
	}
}
