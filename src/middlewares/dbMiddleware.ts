import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory, checkReservePaths } from './stackHandler';

export const dbMiddleware: MiddlewareFactory = (request, res) => {
	return res;
};
export default dbMiddleware;
