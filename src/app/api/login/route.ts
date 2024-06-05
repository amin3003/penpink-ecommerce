import { DBAuth, DBManager, RequestHelper, ServerUserHelper } from '@azrico/nodeserver';
import { hash_matches } from '@azrico/crypto';
import { string_getErrorCode } from '@azrico/string';
import { SimpleUser } from '@codespase/core';
import { NextRequest, NextResponse } from 'next/server';
import { object_get } from '@azrico/object';
export async function POST(req: NextRequest) {
	const rd = await RequestHelper.get_request_data([req]);
	const authObject = await RequestHelper.getAuthObject(req);

	let found_user;
	let provideToken = false;
	if (authObject) {
		if (authObject.token) {
			found_user = await ServerUserHelper.verify_user(authObject.token);
		} else if (authObject.username && authObject.password) {
			found_user = await ServerUserHelper.verify_user(
				authObject.username,
				authObject.password
			);
			provideToken = true;
		}
	}

	if (!found_user) return NextResponse.json({ error: 'user not found' }, { status: 401 });
	if (found_user instanceof Error) {
		return NextResponse.json(
			{ error: found_user.message },
			{ status: string_getErrorCode(found_user) }
		);
	}

	if (provideToken) {
		found_user.token = await DBAuth.makeToken(SimpleUser.getID(found_user), 'full');
	}
	//TODO auth the user and return token
	return Response.json({ data: found_user, message: 'Login successful' });
}
