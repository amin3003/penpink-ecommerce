import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory, resrvedPaths } from './stackHandler';
import { DBManager } from '@azrico/nodeserver';

export const dbMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		//db init must be at layout
		//https://stackoverflow.com/questions/73685786/nextjs-middleware-cant-connect-to-database-mongodb
		//https://stackoverflow.com/questions/71106759/next-js-middleware-module-not-found-cant-resolve-fs

		//// if (resrvedPaths.some((path) => pathname.startsWith(path))) {
		//// 	return next(request, _next);
		//// }
		//// console.log('init db ', pathname);
		//// DBManager.get_option({}, '');
		return next(request, _next);
	};
};
export default dbMiddleware;
