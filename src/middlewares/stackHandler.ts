import { NextMiddleware, NextResponse } from 'next/server';

export const reservedPaths = ['/_next', '/images', '/api', '/_vercel'];
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export function stackMiddlewares(
	functions: MiddlewareFactory[] = [],
	index = 0
): NextMiddleware {
	const current = functions[index];
	if (current) {
		const next = stackMiddlewares(functions, index + 1);
		return current(next);
	}
	return () => NextResponse.next();
}
