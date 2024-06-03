import { DBFiles, DBId, DBInstance, DBManager, ServerApi } from '@azrico/nodeserver';

import { NextResponse } from 'next/server';
export async function GET(req: Request, data: any) {
	ServerApi.init();
	const imageid = data.params.imageid;

	let sq: any = {};
	if (DBId.canBeObjectId(imageid)) {
		sq = { _id: DBId.getObjectId(imageid) };
	} else sq = { filename: imageid };

	const file = await DBFiles.first(sq);

	const filestream = await DBFiles.webStream(DBId.getObjectId(file));

	if (!file || !filestream || filestream instanceof Error) {
		return NextResponse.json({ error: 'image not found' }, { status: 404 });
	}
	const rsp = new Response(filestream as any);
	if (file.metadata.type) rsp.headers.set('content-type', file.metadata.type);
	if (file.metadata.size) rsp.headers.set('content-size', file.metadata.size);
	return rsp;
}
