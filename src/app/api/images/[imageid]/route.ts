import { DBFiles, DBId, DBInstance, DBManager, ServerApi } from '@azrico/nodeserver';

import fs, { ReadStream } from 'fs';
import { NextResponse } from 'next/server';
import { array_first } from '@azrico/object';
import { Duplex, Readable } from 'stream';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const imageid = data.params.imageid;
	const file = await DBFiles.get(imageid);
	const stream = await DBFiles.webStream(DBId.getObjectId(file));

	if (!file || !stream || stream instanceof Error) {
		return NextResponse.json({ error: 'image not found' }, { status: 404 });
	}

	return new Response(stream);
}
