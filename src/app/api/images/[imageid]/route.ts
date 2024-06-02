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

	const stream = await DBFiles.webStream(DBId.getObjectId(file));

	if (!file || !stream || stream instanceof Error) {
		return NextResponse.json({ error: 'image not found' }, { status: 404 });
	}

	return new Response(stream);
}
