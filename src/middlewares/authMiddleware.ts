import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './stackHandler';
import uid from '@azrico/uid';
export const authMiddleware: MiddlewareFactory = (next) => {
	return async (req: NextRequest, _next: NextFetchEvent) => {
		const userHasId = req.cookies.get('uid');
		if (!userHasId) {
			const userId = uid.rnd(32);
			const response = NextResponse.next();
			response.cookies.set('uid', userId);
			return response;
		}
		return next(req, _next);
	};
};
export default authMiddleware;
