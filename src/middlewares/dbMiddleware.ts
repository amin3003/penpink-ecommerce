import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory } from './stackHandler';
import { DBManager } from '@azrico/nodeserver';

export const dbMiddleware: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		//db init must be at layout
		//https://stackoverflow.com/questions/73685786/nextjs-middleware-cant-connect-to-database-mongodb
		//https://stackoverflow.com/questions/71106759/next-js-middleware-module-not-found-cant-resolve-fs

		return next(request, _next);
	};
};
export default dbMiddleware;
