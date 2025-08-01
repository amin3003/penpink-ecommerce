import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFunction } from './stackHandler';
import uid from '@azrico/uid';
// import ServerTokenHelper from '@azrico/nodeserver/dist/src/classes/ServerTokenHelper';
import RequestHelper from '@azrico/nodeserver/dist/src/classes/RequestHelper';
import TokenHelper from '@azrico/nodeserver/dist/src/classes/auth/token/TokenHelper';
// import AuthHelper from '@azrico/nodeserver/dist/src/classes/auth/AuthHelper';
import { array_first } from '@azrico/object';
const restrictedRoutes: string[] = [];
const authMiddleware: MiddlewareFunction = async (
	req: NextRequest,
	res: NextResponse
) => {
	await verifyLogin(req, res);
	await verifyUID(req, res);
	return res;
};
async function verifyLogin(req: NextRequest, res: NextResponse) {
	/* -------------------------- verify the user token ------------------------- */

	let loginAuth = (await RequestHelper.getAuthObject(req)) as any;

	if (loginAuth?.token) {
		const verifiedToken = await TokenHelper.parseToken(loginAuth.token);
		if (verifiedToken && !(verifiedToken instanceof Error) && verifiedToken.user) {
			const user_id = array_first(verifiedToken.aud) ?? '';
			const user_object = verifiedToken.user;

			res.headers.set('x-access', verifiedToken.sub ?? '');
			res.headers.set('x-uid', user_id);
			res.headers.set('x-userid', user_id);
			res.headers.set('x-user-object', JSON.stringify(user_object));
		}
	}
	/* -------------- check if user needs to login to use this path ------------- */
	const p = req.nextUrl.pathname;
	const requireAuth = restrictedRoutes.find((s) => p.includes(s)) != undefined;
	if (requireAuth && !res.headers.get('x-access')) {
		return new NextResponse(null, { status: 401 }); // User is not authenticated
	}
}
async function verifyUID(req: NextRequest, res: NextResponse) {
	/* ------------------------------ check user id ----------------------------- */

	if (res.headers.get('x-uid')) {
		return;
	}
	let userId = req.cookies.get('x-uid')?.value;
	if (!userId) {
		userId = uid.rnd(32);
		res.cookies.set('x-uid', userId);
	}
	res.headers.set('x-uid', userId);
}

const factory = { include: ['/api'], middleware: authMiddleware };
export default factory;
