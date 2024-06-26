import { stackMiddlewares } from '@/middlewares/stackHandler';
import dbMiddleware from './middlewares/dbMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import langMiddleware from './middlewares/langMiddleware';
export const config = {
	unstable_allowDynamic: [
		//https://nextjs.org/docs/app/api-reference/edge#unsupported-apis
		'**/node_modules/mongodb/**',
		'**/node_modules/mongodb/lib',
	],
};
export default stackMiddlewares({
	lang: langMiddleware,
	db: dbMiddleware,
	auth: authMiddleware,
});
