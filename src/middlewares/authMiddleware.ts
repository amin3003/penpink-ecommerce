import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory, checkReservePaths, reservedPaths } from './stackHandler';
import uid from '@azrico/uid';

const loginRoutes = ['admin'];
export const authMiddleware: MiddlewareFactory = (
	req: NextRequest,
	res: NextResponse
) => {
	/* ---------------------- check if user needs to login ---------------------- */

	const p = req.nextUrl.pathname;
	let loginToken = req.cookies.get('token')?.value;
	const requireAuth = loginRoutes.find((s) => p.includes(s)) != undefined;
	if (requireAuth && !loginToken) {
		return new NextResponse(null, { status: 401 }); // User is not authenticated
	}
	/* ------------------------------ check user id ----------------------------- */
	let userId = req.cookies.get('x-uid')?.value;
	if (!userId) {
		userId = uid.rnd(32);
		res.cookies.set('x-uid', userId);
	}
	res.headers.set('x-uid', userId);

	return res;
};
export default authMiddleware;
