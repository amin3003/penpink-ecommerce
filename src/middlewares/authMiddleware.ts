import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory, checkReservePaths, reservedPaths } from './stackHandler';
import uid from '@azrico/uid';
export const authMiddleware: MiddlewareFactory = (
	req: NextRequest,
	res: NextResponse
) => {
	let userId = req.cookies.get('x-uid')?.value;
	if (!userId) {
		userId = uid.rnd(32);
		res.cookies.set('x-uid', userId);
	}
	res.headers.set('x-uid', userId);
	return res;
};
export default authMiddleware;
