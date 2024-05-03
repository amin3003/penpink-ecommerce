import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import Logger from '@azrico/debug';

export const reservedPaths = ['/_next', '/images', '/api', '/_vercel'];

export type MiddlewareFactory = (
	req: NextRequest,
	response: NextResponse
) => NextResponse | Promise<NextResponse>;
type MWInput = {
	[key: string]: MiddlewareFactory;
};
export function stackMiddlewares(mwobject: MWInput) {
	return async (req: NextRequest) => {
		let current_response = NextResponse.next();
		if (checkReservePaths(req)) return current_response;

		const parsedMiddlewares = Object.entries(mwobject);
		for (let index = 0; index < parsedMiddlewares.length; index++) {
			const [middlewareName, middleware] = parsedMiddlewares[index];
			const mwResponse = await middleware(req, current_response);

			if (mwResponse?.status >= 300 && mwResponse?.status < 400) {
				Logger.debug_message(`[middleware]`, `[skip or redirect] : ${middlewareName}`);
				return mwResponse;
			}
			if (mwResponse) current_response = mwResponse;
		}
		return current_response;
	};
}
export function checkReservePaths(req: NextRequest): any {
	const pathname = req.nextUrl.pathname;
	if (reservedPaths.some((path) => pathname.startsWith(path))) {
		return true;
	}
	return false;
}
