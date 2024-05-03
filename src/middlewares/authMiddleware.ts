import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './stackHandler';
import uid from '@azrico/uid';
export const authMiddleware: MiddlewareFactory = (next) => {
	return async (req: NextRequest, _next: NextFetchEvent) => {
		const response = NextResponse.next();
		let userId = req.cookies.get('uid')?.value;
		if (!userId) {
			userId = uid.rnd(32);
			response.cookies.set('uid', userId);
		}
		response.headers.set('x-uid', userId);
		return response;
	};
};
export default authMiddleware;
