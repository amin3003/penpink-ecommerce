import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFunction, isPathAllowed } from './stackHandler';

const dbMiddleware: MiddlewareFunction = (request, res) => {
	return res;
};
const factory = { middleware: dbMiddleware };
export default factory;
