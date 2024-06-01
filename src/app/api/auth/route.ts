import { DBAccess, DBManager, RequestHelper, ServerUserHelper } from '@azrico/nodeserver';
import { hash_matches } from '@azrico/crypto';
import { string_getErrorCode } from '@azrico/string';
import { SimpleUser } from '@codespase/core';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: Request, data: any) {
	const rb = await RequestHelper.get_request_data([req, data]);

	return Response.json({ data: 0 });
}
export async function POST(req: NextRequest) {
	const rd = await RequestHelper.get_request_data([req]);

	const user = rd.user;
	const pass = rd.pass;
	const token = rd.token;

	let found_user;
	let provideToken = false;
	if (token) {
		found_user = await ServerUserHelper.verify_user(token);
	} else if (user && pass) {
		found_user = await ServerUserHelper.verify_user(user, pass);
		provideToken = true;
	}

	if (!found_user) return NextResponse.json({ error: 'user not found' }, { status: 404 });
	if (found_user instanceof Error) {
		return NextResponse.json(
			{ error: found_user.message },
			{ status: string_getErrorCode(found_user) }
		);
	}
	if (provideToken) {
		found_user.token = await DBAccess.makeToken(SimpleUser.getID(found_user), 'full');
		req.cookies.set('token', found_user.token);
	}
	//TODO auth the user and return token
	return Response.json({ data: found_user });
}
