import { DBFiles, DBId, DBInstance, DBManager } from '@azrico/nodeserver';

import fs, { ReadStream } from 'fs';
import { NextResponse } from 'next/server';
import { array_first } from '@azrico/object';
import { Duplex, Readable } from 'stream';

export async function GET(req: Request) {
	return NextResponse.json({ error: 'image not found' }, { status: 404 });
}
