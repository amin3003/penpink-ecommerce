import { ServerAuthHelper, RequestHelper, TokenHelper } from '@azrico/nodeserver';
import { string_getErrorCode } from '@azrico/string';
import { SimpleUser } from '@codespase/core';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	const authObject = await RequestHelper.getAuthObject(req);
	let found_user;
	let provideToken = false;

	if (authObject) {
		if (authObject.token) {
			found_user = await ServerAuthHelper.verifyUser(authObject.token);
		} else if (authObject.username && authObject.password) {
			found_user = await ServerAuthHelper.verifyUser(
				authObject.username,
				authObject.password
			);
			provideToken = true;
		}
	}

	if (!found_user) return NextResponse.json({ error: 'user not found' }, { status: 404 });
	if (found_user instanceof Error) {
		return NextResponse.json(
			{ error: found_user.message },
			{ status: string_getErrorCode(found_user) }
		);
	}
	if (provideToken) {
		found_user = {
			...found_user,
			token: await TokenHelper.makeToken(SimpleUser.getID(found_user), 'full', {
				user: found_user,
			}),
		};
	}

	return Response.json({ data: found_user, message: 'Login successful' });
}
export const dynamic = 'force-dynamic';
