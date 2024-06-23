import { MiddlewareFunction } from './stackHandler';
 
const dbMiddleware: MiddlewareFunction = async (request, res) => {
	res.headers.set('x-url', request.url);
	res.headers.set('x-path', request.nextUrl.pathname);
	return res;
};
const factory = { include: ['/api'], middleware: dbMiddleware };
export default factory;
