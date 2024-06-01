import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import Logger from '@azrico/debug';
import { array_merge } from '@azrico/object';

export const reservedPaths = ['/_next', '/images', '/api', '/_vercel'];

/* -------------------------------------------------------------------------- */
type MWInput = {
	[key: string]: MiddlewareFactory;
};
export type MiddlewareFactory = {
	exclude?: string[];
	include?: string[];
	middleware: MiddlewareFunction;
};
export type MiddlewareFunction = (
	req: NextRequest,
	response: NextResponse
) => NextResponse | Promise<NextResponse>;

export function stackMiddlewares(mwobject: MWInput) {
	return async (req: NextRequest) => {
		let current_response = NextResponse.next();
		const parsedMiddlewares = Object.entries(mwobject);
		const allowedMiddlewares = parsedMiddlewares.filter((s) => isPathAllowed(req, s[1]));
		 
		for (let index = 0; index < allowedMiddlewares.length; index++) {
			const [middlewareName, mwFactory] = allowedMiddlewares[index];

			/* --------------------------- run the middleware --------------------------- */
			const mwFunction = mwFactory.middleware;
			const mwResponse = await mwFunction(req, current_response);
			if (mwResponse?.status >= 300 && mwResponse?.status < 400) {
				Logger.debug_message(`[middleware]`, `[skip or redirect] : ${middlewareName}`);
				return mwResponse;
			}
			if (mwResponse) current_response = mwResponse;
		}
		return current_response;
	};
}
export function isPathAllowed(req: NextRequest, mw: MiddlewareFactory): any {
	const pathname = req.nextUrl.pathname;

	if (mw.include) {
		if (mw.include.some((path) => pathname.startsWith(path))) {
			return true;
		}
	}
	if (array_merge(reservedPaths, mw.exclude).some((path) => pathname.startsWith(path))) {
		return false;
	}
	return true;
}
